export function getMonthName(month: number): string {
  return new Date(2000, month - 1, 1).toLocaleString("en-US", {month: "long"});
}

export function mapToChartData(apiResponse: any[]) {
  // 1. Ambil semua kompetisi unik
  const allCompetitions = new Set<string>();
  apiResponse.forEach((item) => {
    item.competitions.forEach((comp: any) => {
      allCompetitions.add(comp.competitionName);
    });
  });

  const competitionList = Array.from(allCompetitions);

  // 2. Mapping per bulan
  return apiResponse.map((item) => {
    const row: any = {month: item.monthName};

    // isi null dulu untuk semua kompetisi
    competitionList.forEach((name) => {
      row[name] = null;
      row[`${name}_percentage`] = null;
    });

    // total semua kompetisi bulan ini
    const totalInMonth = item.competitions.reduce(
      (sum: number, comp: any) => sum + comp.totalRegistrations,
      0
    );

    let sumPercentages = 0;
    let countCompetitions = competitionList.length;

    // overwrite dengan nilai yg ada
    item.competitions.forEach((comp: any) => {
      row[comp.competitionName] = comp.totalRegistrations;
      const percentage =
        totalInMonth > 0
          ? (comp.totalRegistrations / totalInMonth) * 100
          : 0;

      row[`${comp.competitionName}_percentage`] = parseFloat(
        percentage.toFixed(2)
      );

      sumPercentages += percentage;
    });

    // kompetisi yg tidak ada dianggap 0%
    const missingCount = countCompetitions - item.competitions.length;
    if (missingCount > 0) {
      sumPercentages += 0 * missingCount;
    }

    // rata-rata persentase bulan ini
    row["average_percentage"] =
      countCompetitions > 0
        ? parseFloat((sumPercentages / countCompetitions).toFixed(2))
        : null;

    return row;
  });
}


