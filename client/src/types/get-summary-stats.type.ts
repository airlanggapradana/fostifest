export interface GetSummaryStatsResponse {
  message: string;
  data: Summary;
}

export interface Summary {
  totalUsers: number;
  registrations: Registrations;
  totalTeams: number;
}

export interface Registrations {
  pending: number;
  confirmed: number;
}
