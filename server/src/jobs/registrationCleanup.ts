import prisma from '../../prisma/prisma'

/**
 * Fungsi untuk menghapus record Registration
 * yang belum CONFIRMED dalam waktu tertentu.
 */
export const cleanupUnconfirmedRegistrations = async () => {
  try {
    // Ambil semua registration yang masih belum CONFIRMED
    const unconfirmed = await prisma.registration.findMany({
      where: {
        status: {
          not: "CONFIRMED",
        },
      },
    });

    if (unconfirmed.length === 0) {
      console.log("[CRON] No unconfirmed registrations found.");
      return;
    }

    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);

    // Hapus semuanya
    const deleteResult = await prisma.registration.deleteMany({
      where: {
        status: {
          notIn: ["CONFIRMED", "REJECTED"], // hanya hapus status selain dua ini
        },
        createdAt: {lt: fifteenMinutesAgo}, // opsional: hanya yang lebih lama dari 15 menit
      },
    });

    console.log(`[CRON] Deleted ${deleteResult.count} unconfirmed registrations.`);
  } catch (error) {
    console.error("[CRON] Error during cleanup:", error);
  }
};
