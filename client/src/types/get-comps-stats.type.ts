export interface GetCompsStatsResponse {
  message: string;
  data: StatsData[];
}

export interface StatsData {
  month: string;
  "Build A Scalable Web Application using MERN Stack": number | null;
  "Build A Scalable Web Application using MERN Stack_percentage": number | null;
  "UI/UX Design": number | null;
  "UI/UX Design_percentage": number | null;
  "Software Development": number | null;
  "Software Development_percentage": number | null;
  "Scientific Paper": number | null;
  "Scientific Paper_percentage": number | null;
  average_percentage: number;
}
