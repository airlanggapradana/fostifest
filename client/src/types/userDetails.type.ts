export interface GetUserDetailsResponse {
  message: string;
  data: Data;
}

export interface Team {
  id: string;
  name: string;
  leader: Data;
  members: Data[];
}

export interface Registration {
  registrationId: string;
  status: string;
  competition: Competition;
  transaction: Transaction;
  team: Team | null;
}

export interface Data {
  id: string;
  name: string;
  email: string;
  institusi: string;
  phone: string;
  registrations?: Registration[];
}

export interface Competition {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  type: string;
  category: Category;
}

export interface Category {
  id: string;
  name: string;
}

export interface Transaction {
  id: string;
  status: string;
  amount: number;
  paymentType: string;
  paymentCode: string;
  midtransOrderId: string;
  transactionTime: Date;
}
