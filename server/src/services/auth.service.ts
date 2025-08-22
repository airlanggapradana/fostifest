import {NextFunction, Request, Response} from "express";
import prisma from "../../prisma/prisma";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {LoginSchema, loginSchema} from "../zod/schema";
import {env} from "../env";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {email, password}: LoginSchema = loginSchema.parse(req.body);
    const doLogin = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: {email},
      });

      if (!user) {
        res.status(404).send({
          message: "User not found",
        })
        return null;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(403).send({
          message: "Invalid password",
        })
        return null;
      }

      return jwt.sign({id: user.id, email: user.email, name: user.name}, env.JWT_SECRET, {
        expiresIn: "1d",
      });
    })
    if (!doLogin) return;
    res.status(200).send({
      message: "Login successful",
      data: doLogin
    })
    return;
  } catch (e) {
    next(e);
  }
}