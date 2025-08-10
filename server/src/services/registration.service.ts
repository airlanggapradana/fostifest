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
      const existingRegistration = await tx.registration.findFirst({
        where: {
          AND: [
            {competitionId: payload.competitionId},
            {userId: payload.userId},
          ]
        }
      })
      if (existingRegistration) {
        res.status(400).send({
          message: 'You have already registered for this competition.'
        })
        return
      }

      const isUserParticipant = await tx.user.findUnique({
        where: {id: payload.userId},
        select: {role: true}
      })

      if (isUserParticipant && isUserParticipant.role !== 'PARTICIPANT') {
        res.status(403).send({
          message: 'Only participants can register for competitions.'
        });
        return null;
      }

      return tx.registration.create({
        data: {
          id: `REG-${crypto.randomUUID().slice(0, 5).toUpperCase()}`,
          competition: {
            connect: {
              id: payload.competitionId
            }
          },
          user: {
            connect: {
              id: payload.userId
            }
          },
          status: payload.status
        }
      })
    })
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
      const existingTeam = await tx.team.findFirst({
        where: {
          AND: [
            {competition: {id: payload.competitionId}},
            {leader: {id: payload.leaderId}},
          ]
        }
      })
      if (existingTeam) {
        res.status(400).send({
          message: 'You have already registered a team for this competition.'
        })
        return null;
      }

      const isUserParticipant = await tx.user.findUnique({
        where: {id: payload.leaderId},
        select: {role: true}
      })
      if (isUserParticipant && isUserParticipant.role !== 'PARTICIPANT') {
        res.status(403).send({
          message: 'Only participants can register for competitions.'
        });
        return null;
      }

      return tx.registration.create({
        data: {
          id: `REG-${crypto.randomUUID().slice(0, 5).toUpperCase()}`,
          competition: {
            connect: {
              id: payload.competitionId
            }
          },
          team: {
            create: {
              name: payload.teamName,
              competition: {
                connect: {
                  id: payload.competitionId
                }
              },
              leader: {
                connect: {
                  id: payload.leaderId
                }
              },
              participants: {
                create: payload.memberNames.map((name, index) => ({
                  name,
                  email: payload.memberEmails[index],
                  phoneNumber: payload.memberPhoneNumbers[index]
                }))
              }
            }
          },
          status: payload.status
        }
      })
    })
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