import prisma from '../../prisma/prisma'
import {NextFunction, Response, Request} from "express";

/**
 * Fungsi untuk menghapus record Registration
 * yang belum CONFIRMED dalam waktu tertentu.
 */
export const cleanupUnconfirmedRegistrations = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    // Ambil semua registration yang masih belum CONFIRMED
    const unconfirmed = await prisma.registration.findMany({
      where: {
        status: {
          not: "CONFIRMED",
        },
      },
    });

    if (unconfirmed.length === 0) {
      console.log("[CRON] No unconfirmed registrations found.");
      res.status(200).json('No unconfirmed registrations to delete.');
      return;
    }

    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);

    // Hapus semuanya
    const deleteResult = await prisma.registration.deleteMany({
      where: {
        status: {
          notIn: ["CONFIRMED", "REJECTED"], // hanya hapus status selain dua ini
        },
        createdAt: {lt: fifteenMinutesAgo}, // opsional: hanya yang lebih lama dari 15 menit
      },
    });

    console.log(`[CRON] Deleted ${deleteResult.count} unconfirmed registrations.`);
    res.status(200).json({deletedCount: deleteResult.count});
    return;
  } catch (error) {
    console.error("[CRON] Error during cleanup:", error);
    next(error);
  }
};
