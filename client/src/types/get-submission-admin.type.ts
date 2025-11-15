export interface GetSubmissionsAdmin {
  page: number;
  limit: number;
  total: number;
  data: Datum[];
}

export interface Datum {
  id: string;
  competitionId: string;
  teamId: string;
  userId: string;
  fileUrl: string;
  filePath: string;
  submittedAt: Date;
  competition: Competition;
  team: Team;
  user: User;
  feedbacks: Feedbacks | null;
}

export interface Competition {
  id: string;
  name: string;
}

export interface Feedbacks {
  id: string;
  submissionId: string;
  adminId: string;
  message: string;
  createdAt: Date;
  admin: Competition;
}

export interface Team {
  id: string;
  name: string;
  leaderId: string;
  competitionId: string;
  participants: Participant[];
}

export interface Participant {
  id: string;
  name: string;
  phoneNumber: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  institusi: string;
}
