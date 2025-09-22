export interface GetUserDetailsResponseAdmin {
  message: string;
  data: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  institusi: string;
  createdAt: Date;
  updatedAt: Date;
  registrations: Registration[] | [];
}

export interface Registration {
  id: string;
  status: string;
  competitionId: string;
  userId: string;
  teamId: null | string;
  createdAt: Date;
  updatedAt: Date;
  competition: Competition;
  team: Team | null;
  transaction: Transaction | null;
}

export interface Competition {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  registrationDeadline: Date;
  type: string;
  registrationFee: number;
  status: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
  Submission: Submission[];
}

export interface Submission {
  id: string;
  competitionId: string;
  teamId: null;
  userId: string;
  fileUrl: string;
  submittedAt: Date;
  feedbacks: Feedbacks;
}

export interface Feedbacks {
  id: string;
  submissionId: string;
  adminId: string;
  message: string;
  createdAt: Date;
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
  email: string;
  phoneNumber: string;
  teamId: string;
}

export interface Transaction {
  id: string;
  midtransOrderId: string;
  amount: number;
  status: string;
  paymentType: string;
  paymentCode: string;
  registrationId: string;
  createdAt: Date;
  updatedAt: Date;
  transactionTime: Date;
}
