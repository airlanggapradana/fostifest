export interface GetUsersDataResponse {
  message: string;
  page: number;
  limit: number;
  totalUsers: number;
  totalPages: number;
  data: Users[];
}

export interface Users {
  id: string;
  name: string;
  email: string;
  phone: string;
  institution: string;
  joinedAt: Date;
  totalCompetitions: number;
}
