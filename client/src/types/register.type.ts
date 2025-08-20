export interface RegisterResponse {
  message: string;
  data: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'PARTICIPANT' | 'ADMIN';
  institusi: string;
  createdAt: Date;
  updatedAt: Date;
}
