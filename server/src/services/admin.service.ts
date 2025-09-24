import {Request, Response, NextFunction} from "express";
import prisma from "../../prisma/prisma";
import {getMonthName, mapToChartData} from "../utils/helper";
import ExcelJS from "exceljs";

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

export const getUserData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const nameFilter = (req.query.name as string) || "";

    // total user untuk pagination
    const totalUsers = await prisma.user.count({
      where: {
        name: {
          contains: nameFilter,
          mode: "insensitive", // biar case-insensitive
        },
      },
    });

    const users = await prisma.user.findMany({
      skip,
      take: limit,
      where: {
        AND: [
          {
            name: {
              contains: nameFilter,
              mode: "insensitive",
            },
          },
          {
            role: "PARTICIPANT"
          }
        ]
      },
      include: {
        registrations: {
          select: {competitionId: true},
        },
      },
    });

    // map user + total kompetisi
    const data = users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone,
      institution: u.institusi,
      joinedAt: u.createdAt,
      totalCompetitions: u.registrations.length,
    }));

    res.status(200).json({
      message: "User data fetched successfully",
      page,
      limit,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      data,
    });
    return;
  } catch (error) {
    next(error)
  }
}

export const getAllSubmissions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [submissions, total] = await Promise.all([
      prisma.submission.findMany({
        skip,
        take: limit,
        include: {
          competition: {select: {id: true, name: true}},
          team: {include: {participants: {select: {id: true, name: true, phoneNumber: true}}}},
          user: {select: {id: true, name: true, email: true, phone: true}},
          feedbacks: {include: {admin: {select: {id: true, name: true}}}},
        },
      }),
      prisma.submission.count(),
    ]);

    res.json({
      page,
      limit,
      total,
      data: submissions,
    });
    return;
  } catch (err) {
    next(err);
  }
}

export const getUserDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params;

    const user = await prisma.user.findUnique({
      where: {id},
      include: {
        registrations: {
          include: {
            competition: {
              include: {
                Submission: {
                  include: {
                    feedbacks: true
                  }
                }
              }
            },
            team: {
              include: {
                participants: true,
              },
            },
            transaction: true,
          },
        },
      },
    });

    if (!user) {
      res.status(200).json({message: "User not found", data: null});
      return;
    }

    res.status(200).json({
      message: "User details fetched successfully",
      data: user,
    });
    return;
  } catch (error) {
    next(error);
  }
}

export const exportAsExcel = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const registrations = await prisma.registration.findMany({
      include: {
        competition: true,
        user: true,
        team: {
          include: {
            participants: true,
            leader: true,
          },
        },
        transaction: true,
      },
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Participants");

    // Header
    worksheet.columns = [
      {header: "No", key: "no", width: 6},
      {header: "Competition", key: "competition", width: 25},
      {header: "Team Name", key: "teamName", width: 25},
      {header: "Registration Status", key: "status", width: 20},
      {header: "Registration Date", key: "createdAt", width: 25},
      {header: "Type", key: "type", width: 15},
      {header: "Name", key: "name", width: 25},
      {header: "Email", key: "email", width: 25},
      {header: "Phone", key: "phone", width: 20},
      {header: "Transaction ID", key: "transactionId", width: 25},
      {header: "Order ID", key: "midtransOrderId", width: 25},
      {header: "Amount", key: "amount", width: 15},
      {header: "Payment Type", key: "paymentType", width: 20},
      {header: "Transaction Status", key: "transactionStatus", width: 20},
      {header: "Transaction Time", key: "transactionTime", width: 25},
    ];

    // Styling header
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = {bold: true, color: {argb: "FFFFFFFF"}};
      cell.fill = {type: "pattern", pattern: "solid", fgColor: {argb: "4F81BD"}};
      cell.alignment = {vertical: "middle", horizontal: "center"};
      cell.border = {
        top: {style: "thin"},
        left: {style: "thin"},
        bottom: {style: "thin"},
        right: {style: "thin"},
      };
    });

    let counter = 1;

    // Helper tambah row
    const addRow = (
      reg: any,
      type: string,
      name: string,
      email?: string,
      phone?: string
    ) => {
      const createdAt = reg.createdAt.toISOString().split("T")[0];
      const tx = reg.transaction;

      const row = worksheet.addRow({
        no: counter++,
        competition: reg.competition.name,
        teamName: reg.team ? reg.team.name : "-",
        status: reg.status,
        createdAt,
        type,
        name,
        email: email ?? "-",
        phone: phone ?? "-",
        transactionId: tx?.id ?? "-",
        midtransOrderId: tx?.midtransOrderId ?? "-",
        amount: tx?.amount ?? "-",
        paymentType: tx?.paymentType ?? "-",
        // paymentCode: tx?.paymentCode ?? "-",
        transactionStatus: tx?.status ?? "-",
        transactionTime: tx?.transactionTime
          ? tx.transactionTime.toISOString().replace("T", " ").split(".")[0]
          : "-",
      });

      // Border & alignment
      row.eachCell((cell) => {
        cell.alignment = {vertical: "middle", horizontal: "left", wrapText: true};
        cell.border = {
          top: {style: "thin"},
          left: {style: "thin"},
          bottom: {style: "thin"},
          right: {style: "thin"},
        };
      });

      // Warna status registrasi
      const statusCell = row.getCell(4); // kolom ke-4 = Registration Status
      if (reg.status === "APPROVED" || reg.status === "CONFIRMED") {
        statusCell.fill = {type: "pattern", pattern: "solid", fgColor: {argb: "90EE90"}};
      } else if (reg.status === "PENDING") {
        statusCell.fill = {type: "pattern", pattern: "solid", fgColor: {argb: "FFFF99"}};
      } else {
        statusCell.fill = {type: "pattern", pattern: "solid", fgColor: {argb: "FF9999"}};
      }

      // Warna khusus untuk row Team Leader & Member
      if (type === "Team Leader" || type === "Team Member") {
        row.eachCell((cell) => {
          cell.fill = {type: "pattern", pattern: "solid", fgColor: {argb: "D9E1F2"}};
        });
      }
    };

    // Tambah data sesuai tipe kompetisi
    registrations.forEach((reg) => {
      if (reg.competition.type === "INDIVIDUAL" && reg.user) {
        addRow(reg, "Individual", reg.user.name, reg.user.email, reg.user.phone);
      }

      if (reg.competition.type === "TEAM" && reg.team) {
        addRow(reg, "Team Leader", reg.team.leader.name, reg.team.leader.email, reg.team.leader.phone);
        reg.team.participants.forEach((p) => {
          addRow(reg, "Team Member", p.name, p.email ?? "-", p.phoneNumber ?? "-");
        });
      }
    });

    // Auto-fit column width
    worksheet.columns.forEach((col) => {
      if (!col) return;
      let maxLength = 15;
      // @ts-ignore
      col.eachCell({includeEmpty: true}, (cell) => {
        const val = cell.value ? cell.value.toString() : "";
        if (val.length > maxLength) maxLength = val.length;
      });
      col.width = maxLength + 2;
    });

    // Response
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=participants.xlsx");

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    next(error);
  }
}