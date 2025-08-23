import {NextFunction, Request, Response} from "express";
import prisma from "../../prisma/prisma";
import {UserSchema, userSchema} from "../zod/schema";
import * as bcrypt from "bcrypt";

export const newUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload: UserSchema = userSchema.parse(req.body);
    const createUser = await prisma.$transaction(async (tx) => {
      const existingUser = await tx.user.findUnique({
        where: {email: payload.email}
      });

      if (existingUser) {
        res.status(400).send({
          message: 'User with this email already exists'
        })
        return null;
      }

      const {password, ...rest} = payload
      const hashedPassword = await bcrypt.hash(password, 12);

      return tx.user.create({
        data: {
          id: `USER-${crypto.randomUUID().slice(0, 3).toUpperCase()}`,
          password: hashedPassword,
          name: rest.name,
          phone: rest.phone,
          email: rest.email,
          institusi: rest.institusi,
          role: rest.role,
        }
      })
    })
    if (!createUser) return;
    res.status(201).send({
      message: 'User created successfully',
      data: createUser
    })
    return
  } catch (e) {
    next(e);
  }
}

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {limit, role} = req.query;
    const users = await prisma.user.findMany({
      take: limit ? parseInt(limit as string) : undefined,
      where: {
        role: role ? role as 'ADMIN' | 'PARTICIPANT' : undefined
      },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    if (users.length === 0) {
      res.status(200).send({
        message: 'No users found',
        data: []
      });
      return;
    }
    res.status(200).send({
      message: 'Users fetched successfully',
      data: users
    });
    return;
  } catch (e) {
    next(e)
  }
}

export async function getUserDetails(req: Request, res: Response, next: NextFunction) {
  try {
    const {id} = req.params;

    const user = await prisma.user.findUnique({
      where: {id},
      include: {
        registrations: {
          include: {
            competition: {include: {category: true}},
            transaction: true,
            team: {
              include: {
                leader: true,
                participants: true,
              },
            },
            user: true
          },
        },
      },
    });

    if (!user) {
      res.status(404).json({message: "User not found"});
      return;
    }

    // Format response supaya lebih rapih
    const formatted = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      registrations: user.registrations.map((r) => ({
        registrationId: r.id,
        status: r.status,
        competition: {
          id: r.competition.id,
          name: r.competition.name,
          description: r.competition.description,
          type: r.competition.type,
          category: r.competition.category,
        },
        transaction: r.transaction
          ? {
            id: r.transaction.id,
            status: r.transaction.status,
            amount: r.transaction.amount,
            paymentType: r.transaction.paymentType,
            paymentCode: r.transaction.paymentCode,
            midtransOrderId: r.transaction.midtransOrderId,
            transactionTime: r.transaction.transactionTime,
          }
          : null,
        team:
          r.competition.type === "TEAM" && r.team
            ? {
              id: r.team.id,
              name: r.team.name,
              leader: {
                id: r.team.leader.id,
                name: r.team.leader.name,
                email: r.team.leader.email,
                phone: r.team.leader.phone,
              },
              members: r.team.participants.map((p) => ({
                id: p.id,
                name: p.name,
                email: p.email,
                phone: p.phoneNumber,
              })),
            }
            : null,
      })),
    };

    if (!formatted) {
      res.status(200).send({
        message: "No user details found",
        data: null,
      })
      return;
    }

    res.status(200).send({
      message: "User details fetched successfully",
      data: formatted,
    })
    return;
  } catch (err) {
    console.error("Get user details error:", err);
    next(err);
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params;
    const payload: Partial<UserSchema> = userSchema.partial().parse(req.body);
    const update = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: {id}
      })
      if (!user) {
        res.status(404).send({
          message: 'User not found'
        });
        return null;
      }
      const {password, ...rest} = payload;
      const hashedPassword = password ? await bcrypt.hash(password, 12) : user.password;
      return tx.user.update({
        where: {id},
        data: {
          ...rest,
          password: hashedPassword,
        }
      })
    })
    if (!update) return;
    res.status(200).send({
      message: 'User updated successfully',
      data: update
    })
    return
  } catch (e) {
    next(e);
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params;
    const doDelete = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: {id}
      })
      if (!user) {
        res.status(404).send({
          message: 'User not found'
        });
        return null;
      }
      return tx.user.delete({
        where: {id}
      })
    })
    if (!doDelete) return;
    res.status(200).send({
      message: 'User deleted successfully',
      data: doDelete
    })
    return
  } catch (e) {
    next(e);
  }
}