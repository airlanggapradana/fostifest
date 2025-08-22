import {Request, Response} from "express";
import prisma from "../../prisma/prisma";
import ExcelJS from "exceljs";

export async function exportRegistrationsExcel(req: Request, res: Response) {
  try {
    const {competitionId, status} = req.query;

    // filter condition
    const where: any = {};
    if (competitionId) where.competitionId = String(competitionId);
    if (status) where.status = String(status);

    const registrations = await prisma.registration.findMany({
      where,
      include: {
        user: true,
        competition: {include: {category: true}},
        transaction: true,
        team: {
          include: {
            leader: true,
            participants: true,
          },
        },
      },
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Registrations");

    // Header
    worksheet.columns = [
      {header: "Registration ID", key: "registrationId", width: 25},
      {header: "Competition", key: "competition", width: 25},
      {header: "Category", key: "category", width: 20},
      {header: "Type", key: "type", width: 12},
      {header: "User Name", key: "userName", width: 20},
      {header: "User Email", key: "userEmail", width: 25},
      {header: "User Phone", key: "userPhone", width: 20},
      {header: "Team Name", key: "teamName", width: 20},
      {header: "Team Leader", key: "teamLeader", width: 25},
      {header: "Participants", key: "participants", width: 40},
      {header: "Registration Status", key: "regStatus", width: 18},
      {header: "Payment Status", key: "payStatus", width: 18},
      {header: "Amount", key: "amount", width: 15},
      {header: "Payment Type", key: "payType", width: 15},
      {header: "Payment Code", key: "payCode", width: 20},
      {header: "Midtrans Order ID", key: "orderId", width: 30},
      {header: "Transaction Time", key: "trxTime", width: 25},
    ];

    // Styling Header
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = {bold: true, color: {argb: "FFFFFFFF"}};
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {argb: "4472C4"}, // biru
      };
      cell.alignment = {vertical: "middle", horizontal: "center"};
      cell.border = {
        top: {style: "thin"},
        left: {style: "thin"},
        bottom: {style: "thin"},
        right: {style: "thin"},
      };
    });

    // Data Rows
    registrations.forEach((r) => {
      const competition = r.competition;
      const transaction = r.transaction;
      const team = r.team;

      const participantList =
        team?.participants
          .map((p) => `${p.name} (${p.email})`)
          .join(", ") || "";

      const row = worksheet.addRow({
        registrationId: r.id,
        competition: competition.name,
        category: competition.category?.name,
        type: competition.type,
        userName: r.user?.name || "-",
        userEmail: r.user?.email || "-",
        userPhone: r.user?.phone || "-",
        teamName: team?.name || "-",
        teamLeader: team ? `${team.leader.name} (${team.leader.email})` : "-",
        participants: participantList,
        regStatus: r.status,
        payStatus: transaction?.status,
        amount: transaction?.amount,
        payType: transaction?.paymentType,
        payCode: transaction?.paymentCode,
        orderId: transaction?.midtransOrderId,
        trxTime: transaction?.transactionTime
          ? new Date(transaction.transactionTime).toLocaleString()
          : "-",
      });

// 🎨 Style Payment Status cell
      const payStatusCell = row.getCell("payStatus");
      if (transaction?.status === "SUCCESS") {
        payStatusCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: {argb: "C6EFCE"},
        };
        payStatusCell.font = {color: {argb: "006100"}, bold: true};
      } else if (transaction?.status === "PENDING") {
        payStatusCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: {argb: "FFEB9C"},
        };
        payStatusCell.font = {color: {argb: "9C6500"}, bold: true};
      } else if (transaction?.status === "FAILED") {
        payStatusCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: {argb: "FFC7CE"},
        };
        payStatusCell.font = {color: {argb: "9C0006"}, bold: true};
      }

// 🎨 Style Registration Status cell
      const regStatusCell = row.getCell("regStatus");
      if (r.status === "CONFIRMED") {
        regStatusCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: {argb: "BDD7EE"}, // light blue
        };
        regStatusCell.font = {color: {argb: "002060"}, bold: true};
      } else if (r.status === "PENDING") {
        regStatusCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: {argb: "FFC7CE"}, // light red
        };
        regStatusCell.font = {color: {argb: "9C0006"}, bold: true};
      } else if (r.status === "REJECTED") {
        regStatusCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: {argb: "E7E6E6"}, // grey
        };
        regStatusCell.font = {color: {argb: "7F7F7F"}, italic: true};
      }

    });

    // Styling Data Cells
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // skip header
      row.eachCell((cell) => {
        cell.alignment = {vertical: "middle", horizontal: "left"};
        cell.border = {
          top: {style: "thin"},
          left: {style: "thin"},
          bottom: {style: "thin"},
          right: {style: "thin"},
        };
      });
    });

    // Auto filter
    const lastColumn = worksheet.columnCount;
    const lastColumnLetter = worksheet.getColumn(lastColumn).letter || "Q";

    worksheet.autoFilter = {
      from: "A1",
      to: `${lastColumnLetter}1`,
    };

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=registrations.xlsx");

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error("Export Excel error:", err);
    res.status(500).json({error: "Failed to export Excel"});
  }
}
