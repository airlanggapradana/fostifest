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

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params;
    const user = await prisma.user.findUnique({
      where: {id}
    })
    if (!user) {
      res.status(404).send({
        message: 'User not found'
      });
      return;
    }
    res.status(200).send({
      message: 'User fetched successfully',
      data: user
    })
    return
  } catch (e) {
    next(e);
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