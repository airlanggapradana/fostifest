import {Request, Response, NextFunction} from "express";
import prisma from "../../prisma/prisma";
import {
  registrationIndividualSchema,
  RegistrationIndividualSchema, RegistrationTeamSchema, registrationTeamSchema,
} from "../zod/schema";

export const newRegistrationIndividual = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload: RegistrationIndividualSchema = registrationIndividualSchema.parse(req.body);
    const registration = await prisma.$transaction(async (tx) => {
      // 1. Pastikan kompetisi tipe INDIVIDUAL atau WORKSHOP
      const competition = await tx.competition.findUnique({
        where: {id: payload.competitionId},
        select: {type: true}
      });
      if (competition?.type !== "INDIVIDUAL" && competition?.type !== "WORKSHOP") {
        res.status(400).send({
          message: "This competition is not for individual participants.",
        })
        return null;
      }

      // 2. Cek apakah user sudah terdaftar
      const existingRegistration = await tx.registration.findFirst({
        where: {
          competitionId: payload.competitionId,
          userId: payload.userId
        }
      });
      if (existingRegistration) {
        res.status(400).send({
          message: "You are already registered for this competition.",
        })
        return null;
      }

      // 3. Cek role user
      const user = await tx.user.findUnique({
        where: {id: payload.userId},
        select: {role: true}
      });
      if (!user || user.role !== "PARTICIPANT") {
        res.status(400).send({
          message: "Only participants can register for this competition.",
        })
        return null;
      }

      // 4. Buat registrasi
      return tx.registration.create({
        data: {
          id: `REG-${crypto.randomUUID().slice(0, 5).toUpperCase()}`,
          competition: {connect: {id: payload.competitionId}},
          user: {connect: {id: payload.userId}},
          status: payload.status
        }
      });
    });

    if (!registration) return;
    res.status(201).send({
      message: 'Registration created successfully',
      data: registration
    });
    return
  } catch (e) {
    next(e);
  }
}

export const newRegistrationTeam = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload: RegistrationTeamSchema = registrationTeamSchema.parse(req.body);
    const registration = await prisma.$transaction(async (tx) => {
      // 1. Cek apakah leader sudah punya tim di kompetisi ini
      const existingTeam = await tx.team.findFirst({
        where: {
          competitionId: payload.competitionId,
          leaderId: payload.leaderId
        }
      });
      if (existingTeam) {
        res.status(400).send({
          message: "You already have a team registered for this competition.",
        })
        return null;
      }

      // 2. Cek role leader
      const leader = await tx.user.findUnique({
        where: {id: payload.leaderId},
        select: {role: true}
      });
      if (!leader || leader.role !== "PARTICIPANT") {
        res.status(400).send({
          message: "Only participants can create a team.",
        })
        return null;
      }

      // 3. Validasi jumlah anggota
      if (payload.memberNames.length < 2 || payload.memberNames.length > 3) {
        res.status(400).send({
          message: "Team must have 2 to 3 members including the leader.",
        })
        return null;
      }

      // 4. Registrasi + buat tim + anggota
      return tx.registration.create({
        data: {
          id: `REG-${crypto.randomUUID().slice(0, 5).toUpperCase()}`,
          status: payload.status,
          competition: {connect: {id: payload.competitionId}},
          user: {connect: {id: payload.leaderId}},
          team: {
            create: {
              name: payload.teamName,
              competition: {connect: {id: payload.competitionId}},
              leader: {connect: {id: payload.leaderId}},
              participants: {
                create: payload.memberNames.map((name, index) => ({
                  name,
                  email: payload.memberEmails[index],
                  phoneNumber: payload.memberPhoneNumbers[index]
                }))
              }
            }
          }
        }
      });
    });

    if (!registration) return;
    res.status(201).send({
      message: 'Team registration created successfully',
      data: registration
    })
    return
  } catch (e) {
    next(e);
  }
}