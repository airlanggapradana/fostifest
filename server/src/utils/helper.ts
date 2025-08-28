export function getMonthName(month: number): string {
  return new Date(2000, month - 1, 1).toLocaleString("en-US", {month: "long"});
}

export function mapToChartData(apiResponse: any[]) {
  // 1. Ambil semua nama kompetisi unik
  const allCompetitions = new Set<string>();
  apiResponse.forEach((item) => {
    item.competitions.forEach((comp: any) => {
      allCompetitions.add(comp.competitionName);
    });
  });

  // 2. Mapping per bulan
  return apiResponse.map((item) => {
    const row: any = {month: item.monthName};

    // isi 0 dulu untuk semua kompetisi
    allCompetitions.forEach((name) => {
      row[name] = 0;
    });

    // overwrite dengan nilai yang ada
    item.competitions.forEach((comp: any) => {
      row[comp.competitionName] = comp.totalRegistrations;
    });

    return row;
  });
}

