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
    const {category} = req.query;
    const competitions = await prisma.competition.findMany({
      where: {
        category: {
          name: category ? String(category) : undefined
        }
      },
      include: {
        registrations: true,
        category: {
          select: {
            name: true
          }
        }
      }
    })
    if (competitions.length === 0) {
      res.status(200).send({
        message: 'No competitions found',
        data: []
      })
      return
    }
    res.status(200).send({
      message: 'Competitions fetched successfully',
      data: competitions
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
      where: {
        id
      },
      include: {
        registrations: true,
        category: {
          select: {
            name: true
          }
        }
      }
    })
    if (!competition) {
      res.status(404).send({
        message: 'Competition not found'
      })
      return;
    }
    res.status(200).send({
      message: 'Competition fetched successfully',
      data: competition
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