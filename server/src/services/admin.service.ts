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

export const getDataSummary = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    // total user
    const totalUsers = await prisma.user.count();

    // total registrasi per status (PENDING & CONFIRMED)
    const registrations = await prisma.registration.groupBy({
      by: ["status"],
      _count: {id: true},
      where: {
        status: {in: ["PENDING", "CONFIRMED"]},
      },
    });

    const pendingCount =
      registrations.find((r) => r.status === "PENDING")?._count.id || 0;
    const confirmedCount =
      registrations.find((r) => r.status === "CONFIRMED")?._count.id || 0;

    // jumlah tim di kompetisi tipe TEAM
    const totalTeams = await prisma.team.count({
      where: {
        competition: {
          type: "TEAM",
        },
      },
    });

    res.status(200).json({
      message: "Data summary fetched successfully",
      data: {
        totalUsers,
        registrations: {
          pending: pendingCount,
          confirmed: confirmedCount,
        },
        totalTeams,
      }
    });
    return
  } catch (error) {
    next(error);
  }
}