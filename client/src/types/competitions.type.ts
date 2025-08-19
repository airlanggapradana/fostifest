export interface GetAllCompetitionsResponse {
  message: string;
  data: Data[];
}

export interface Data {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'UPCOMING' | 'ONGOING' | 'FINISHED' | 'CANCELED';
  startDate: Date;
  endDate: Date;
  deadline: Date;
  type: string;
  totalRegistrations: number;
  totalParticipants: number;
}
