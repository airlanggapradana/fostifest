import {Request, Response, NextFunction} from "express";
import prisma from "../../prisma/prisma";
import {getMonthName, mapToChartData} from "../utils/helper";

export const getRegistrationsByCompetitionLastMonths = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const monthsBack = 5;
    const now = new Date();
    const results: any[] = [];

    for (let i = 0; i < monthsBack; i++) {
      const year = now.getFullYear();
      const month = now.getMonth() + 1 - i;

      // kalau mundur ke tahun sebelumnya
      const adjustedYear = month < 1 ? year - 1 : year;
      const adjustedMonth = ((month - 1 + 12) % 12) + 1;

      const startDate = new Date(adjustedYear, adjustedMonth - 1, 1);
      const endDate = new Date(adjustedYear, adjustedMonth, 1);

      const grouped = await prisma.registration.groupBy({
        by: ["competitionId"],
        where: {
          createdAt: {
            gte: startDate,
            lt: endDate,
          },
        },
        _count: {
          id: true,
        },
      });

      const withCompetition = await Promise.all(
        grouped.map(async (item) => {
          const comp = await prisma.competition.findUnique({
            where: {id: item.competitionId},
            select: {name: true},
          });

          return {
            competitionId: item.competitionId,
            competitionName: comp?.name ?? "Unknown",
            totalRegistrations: item._count.id,
            month: adjustedMonth,
            monthName: getMonthName(adjustedMonth),
            year: adjustedYear,
          };
        })
      );

      results.push({
        month: adjustedMonth,
        monthName: getMonthName(adjustedMonth),
        year: adjustedYear,
        competitions: withCompetition,
      });
    }

    const chartData = mapToChartData(results);

    res.status(200).send({
      message: 'Registrations by competition for the last months fetched successfully',
      data: chartData
    })
    return
  } catch (e) {
    next(e);
  }
}