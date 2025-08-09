import {Request, Response} from "express";
import prisma from "../../prisma/prisma";
import {ZodError} from "zod";
import {UserSchema, userSchema} from "../zod/schema";
import * as bcrypt from "bcrypt";

export const newUser = async (req: Request, res: Response) => {
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
    if (e instanceof ZodError) {
      res.status(400).send({
        message: 'Invalid registration data',
        errors: e.issues
      });
      return
    }
    res.status(500).send({
      message: 'Internal server error',
      error: e instanceof Error ? e.message : 'Unknown error'
    })
    return
  }
}