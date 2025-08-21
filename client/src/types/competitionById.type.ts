export interface GetCompetitionByIdResponse {
  message: string;
  data: Data;
}

export interface Data {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  deadline: Date;
  type: string;
  category: string;
  totalRegistrations: number;
  totalParticipants: number;
  participants: Participant[];
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  role: 'INDIVIDUAL' | 'TEAM_LEADER' | 'TEAM_MEMBER';
}
