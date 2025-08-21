import {NextFunction, Request, Response} from "express";
import prisma from "../../prisma/prisma";
import {CreatePaymentBody, createPaymentBody} from "../zod/schema";
import {TransactionStatus} from "../../generated/prisma";
import {env} from "../env";
import midtransClient from 'midtrans-client';
import crypto from 'crypto';
import {MidtransStatus} from "../types/midtrans-status.type";

function mapStatus(mtStatus: string, fraud?: string): TransactionStatus {
  if (mtStatus === 'capture') return fraud === 'challenge' ? 'PENDING' : 'SUCCESS';
  if (mtStatus === 'settlement') return 'SUCCESS';
  if (mtStatus === 'pending') return 'PENDING';
  if (mtStatus === 'expire') return 'EXPIRED';
  if (['cancel', 'deny', 'failure'].includes(mtStatus)) return 'FAILED';
  return 'FAILED';
}

function calcSig(order_id: string, status_code: string, gross_amount: string) {
  return crypto.createHash('sha512').update(order_id + status_code + gross_amount + env.MIDTRANS_SERVER_KEY).digest('hex');
}

const isProduction = env.MIDTRANS_IS_PRODUCTION;

const snap = new (midtransClient as any).Snap({
  isProduction,
  serverKey: env.MIDTRANS_SERVER_KEY,
  clientKey: env.MIDTRANS_CLIENT_KEY
});

const coreApi = new (midtransClient as any).CoreApi({
  isProduction,
  serverKey: env.MIDTRANS_SERVER_KEY,
  clientKey: env.MIDTRANS_CLIENT_KEY
});

export async function createPayment(req: Request, res: Response, next: NextFunction) {
  try {
    const body: CreatePaymentBody = createPaymentBody.parse(req.body);

    const result = await prisma.$transaction(async (tx) => {
      // ambil registration + competition
      const reg = await tx.registration.findUnique({
        where: {id: body.registrationId},
        include: {competition: true},
      });

      if (!reg) throw new Error('Registration not found');

      const competition = reg.competition;
      const amount = competition.registrationFee;
      const orderId = `FF-${crypto.randomUUID().slice(0, 3).toUpperCase()}`;

      // buat transaksi pending di DB
      await tx.transaction.create({
        data: {
          id: `FF-${crypto.randomUUID()}`,
          midtransOrderId: orderId,
          amount,
          status: 'PENDING',
          registrationId: body.registrationId,
        },
      });

      // request ke Midtrans
      const param = {
        transaction_details: {
          order_id: orderId,
          gross_amount: amount,
        },
        customer_details: {
          first_name: body.customer.name,
          email: body.customer.email,
          phone: body.customer.phone,
        },
        item_details: [
          {
            id: competition.id,
            name: competition.name,
            price: amount,
            quantity: 1,
          },
        ],
      };

      const snapTx = await snap.createTransaction(param);

      // balikin data hasil (Midtrans + orderId)
      return {orderId, token: snapTx.token, redirect_url: snapTx.redirect_url};
    });

    res.json(result);
    return;
  } catch (e) {
    next(e)
  }
}

export async function handleNotification(req: Request, res: Response, next: NextFunction) {
  const n = req.body;

  try {
    // ✅ verify signature
    const expectedSig = calcSig(n.order_id, n.status_code, n.gross_amount);
    if (n.signature_key !== expectedSig) {
      return res.status(401).json({error: 'Invalid signature'});
    }

    // ✅ ambil status dari Midtrans
    const statusResp: MidtransStatus = await coreApi.transaction.status(n.order_id);
    const dbStatus = mapStatus(statusResp.transaction_status, statusResp.fraud_status);

    // ✅ pakai prisma transaction biar atomic
    const updated = await prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.update({
        where: {midtransOrderId: n.order_id},
        data: {
          status: dbStatus,
          paymentType: statusResp.payment_type,
          paymentCode: statusResp.signature_key,
          transactionTime: statusResp.transaction_time ? new Date(statusResp.transaction_time) : null,
        },
        include: {registration: true},
      });

      // kalau sudah sukses → update registration jadi CONFIRMED
      if (dbStatus === 'SUCCESS' && transaction.registrationId) {
        await tx.registration.update({
          where: {id: transaction.registrationId},
          data: {status: 'CONFIRMED'},
        });
      }

      return transaction;
    });

    res.json({ok: true, newStatus: updated.status});
    return;
  } catch (err) {
    next(err);
  }
}
