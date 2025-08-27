import {Request, Response, NextFunction} from "express";
import prisma from "../../prisma/prisma";
import {CompetitionSchema, competitionSchema} from "../zod/schema";

export const createCompetition = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload: CompetitionSchema = competitionSchema.parse(req.body);
    const newComp = await prisma.$transaction(async (tx) => {
      const existingCompetition = await tx.competition.findFirst({
        where: {
          name: payload.name,
        }
      })
      if (existingCompetition) {
        res.status(400).send({
          message: 'Competition with this name already exists'
        })
        return null;
      }

      const {category, ...rest} = payload;

      return tx.competition.create({
        data: {
          id: `COMP-${crypto.randomUUID().slice(0, 5).toUpperCase()}`,
          category: {
            connectOrCreate: {
              where: {name: category},
              create: {name: category}
            }
          },
          ...rest
        }
      })
    })
    if (!newComp) return;
    res.status(201).send({
      message: 'Competition created successfully',
      data: newComp
    })
    return
  } catch (e) {
    next(e);
  }
}

export const getCompetitions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {type} = req.query;
    const competitions = await prisma.competition.findMany({
      where: {
        type: type ? type as 'INDIVIDUAL' | 'TEAM' | 'WORKSHOP' : undefined
      },
      include: {
        category: true,
        registrations: {
          include: {
            user: true,
            team: {
              include: {
                participants: true,
              },
            },
          },
        },
        _count: {
          select: {
            registrations: true, // jumlah registrasi
          },
        },
      },
    });


    const result = competitions.map((comp) => {
      let totalParticipants = 0;

      comp.registrations.forEach((reg) => {
        if (reg.user) {
          totalParticipants += 1; // INDIVIDUAL
        } else if (reg.team) {
          totalParticipants += reg.team.participants.length; // TEAM members
        }
      });

      return {
        id: comp.id,
        name: comp.name,
        description: comp.description,
        category: comp.category.name,
        status: comp.status,
        startDate: comp.startDate,
        endDate: comp.endDate,
        deadline: comp.registrationDeadline,
        prize: comp.registrationFee,
        type: comp.type,
        totalRegistrations: comp._count.registrations, // jumlah registrasi
        totalParticipants, // jumlah peserta
      };
    });

    if (result.length === 0) {
      res.status(200).send({
        message: 'No competitions found',
        data: []
      })
      return
    }
    res.status(200).send({
      message: 'Competitions fetched successfully',
      data: result
    })
    return
  } catch (e) {
    next(e);
  }
}

export const getCompetitionById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params;
    const competition = await prisma.competition.findUnique({
      where: {id}, // ganti sesuai ID
      include: {
        category: true,
        registrations: {
          include: {
            user: {
              select: {id: true, name: true, email: true},
            },
            team: {
              include: {
                leader: {select: {id: true, name: true, email: true}},
                participants: {select: {id: true, name: true, email: true}},
              },
            },
          },
        },
        _count: {select: {registrations: true}},
      },
    });

    type ParticipantWithRole = {
      id: string;
      name: string;
      email: string;
      role: "INDIVIDUAL" | "TEAM_LEADER" | "TEAM_MEMBER";
    };

    type CompetitionWithStats = {
      id: string;
      name: string;
      description: string;
      startDate: Date;
      endDate: Date;
      deadline: Date;
      prize: number;
      type: "INDIVIDUAL" | "TEAM" | "WORKSHOP";
      category: string;
      totalRegistrations: number;
      totalParticipants: number;
      participants: ParticipantWithRole[];
    };

    const result: CompetitionWithStats | null = competition
      ? {
        id: competition.id,
        name: competition.name,
        description: competition.description,
        startDate: competition.startDate,
        endDate: competition.endDate,
        prize: competition.registrationFee,
        deadline: competition.registrationDeadline,
        type: competition.type,
        category: competition.category.name,
        totalRegistrations: competition._count.registrations,
        totalParticipants: competition.registrations.reduce((sum, reg) => {
          if (reg.user) return sum + 1;
          if (reg.team) return sum + reg.team.participants.length + 1; // +1 leader
          return sum;
        }, 0),
        participants: competition.registrations.flatMap((reg): ParticipantWithRole[] => {
          if (reg.user) {
            return [
              {
                id: reg.user.id,
                name: reg.user.name,
                email: reg.user.email,
                role: "INDIVIDUAL" as const,
              },
            ];
          }

          if (reg.team) {
            return [
              {
                id: reg.team.leader.id,
                name: reg.team.leader.name,
                email: reg.team.leader.email,
                role: "TEAM_LEADER" as const,
              },
              ...reg.team.participants.map((p) => ({
                id: p.id,
                name: p.name,
                email: p.email ?? "", // kalau bisa null, kasih fallback
                role: "TEAM_MEMBER" as const,
              })),
            ];
          }

          return [];
        }),
      }
      : null;

    if (!result) {
      res.status(200).send({
        message: 'Competition not found',
        data: []
      })
      return;
    }

    res.status(200).send({
      message: 'Competition fetched successfully',
      data: result
    })
    return
  } catch (e) {
    next(e);
  }
}

export const updateCompetition = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params;
    const payload: Partial<CompetitionSchema> = competitionSchema.partial().parse(req.body);
    const doUpdate = await prisma.$transaction(async (tx) => {
      const existingCompetition = await tx.competition.findUnique({
        where: {
          id
        }
      })
      if (!existingCompetition) {
        res.status(404).send({
          message: 'Competition not found'
        })
        return null;
      }

      const {category, ...rest} = payload;

      return tx.competition.update({
        where: {
          id
        },
        data: {
          category: category ? {
            connectOrCreate: {
              where: {name: category},
              create: {name: category}
            }
          } : undefined,
          ...rest
        }
      })
    })
    if (!doUpdate) return;
    res.status(200).send({
      message: 'Competition updated successfully',
      data: doUpdate
    })
    return
  } catch (e) {
    next(e);
  }
}

export const deleteCompetition = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params;
    const deletedComp = await prisma.$transaction(async (tx) => {
      const existingCompetition = await tx.competition.findUnique({
        where: {
          id
        }
      })
      if (!existingCompetition) {
        res.status(404).send({
          message: 'Competition not found'
        })
        return null;
      }

      return tx.competition.delete({
        where: {
          id
        }
      })
    })
    if (!deletedComp) return;
    res.status(200).send({
      message: 'Competition deleted successfully',
      data: deletedComp
    })
    return
  } catch (e) {
    next(e);
  }
}