export interface RegistrationResponse {
  message: string;
  data: Data;
}

export interface Data {
  id: string;
  status: string;
  competitionId: string;
  userId: string | null;
  teamId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
