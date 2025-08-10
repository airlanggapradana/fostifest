import {z} from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters long'),
  role: z.enum(['ADMIN', 'PARTICIPANT'], 'Role must be either ADMIN or PARTICIPANT'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
})

export const competitionSchema = z.object({
  name: z.string().min(1, 'Competition name is required'),
  description: z.string().min(1, 'Competition description is required'),
  startDate: z.iso.datetime('Start date is required'),
  endDate: z.iso.datetime('End date is required'),
  registrationDeadline: z.iso.datetime('Registration deadline is required'),
  type: z.enum(['INDIVIDUAL', 'TEAM'], 'Competition type must be either INDIVIDUAL or TEAM'),
  registrationFee: z.number().min(0, 'Registration fee must be a non-negative number'),
  status: z.enum(['UPCOMING', 'ONGOING', 'FINISHED', 'CANCELED'], 'Competition status must be one of the predefined values'),
  category: z.string().min(1, 'Category is required'),
})

export type CompetitionSchema = z.infer<typeof competitionSchema>;
export type UserSchema = z.infer<typeof userSchema>;