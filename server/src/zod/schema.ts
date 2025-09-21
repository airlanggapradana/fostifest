import {z} from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters long'),
  phone: z.string().min(1, 'Phone number is required').regex(/^\+?\d{10,15}$/, 'Invalid phone number format'),
  institusi: z.string().min(1, 'Institution is required'),
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
  type: z.enum(['INDIVIDUAL', 'TEAM', 'WORKSHOP'], 'Competition type must be either INDIVIDUAL, TEAM, or WORKSHOP'),
  registrationFee: z.number().min(0, 'Registration fee must be a non-negative number'),
  status: z.enum(['UPCOMING', 'ONGOING', 'FINISHED', 'CANCELED'], 'Competition status must be one of the predefined values'),
  category: z.string().min(1, 'Category is required'),
})

export const registrationIndividualSchema = z.object({
  competitionId: z.string().min(1, 'Competition id is required'),
  status: z.enum(['PENDING', 'CONFIRMED', 'REJECTED'], 'Registration status must be one of the predefined values'),
  userId: z.string().min(1, 'User id is required'),
})

export const registrationTeamSchema = z.object({
  competitionId: z.string().min(1, 'Competition id is required'),
  status: z.enum(['PENDING', 'CONFIRMED', 'REJECTED'], 'Registration status must be one of the predefined values'),
  leaderId: z.string().min(1, 'Leader id is required'),
  teamName: z.string().min(1, 'Team name is required'),
  memberNames: z.array(z.string().min(1, 'Member name is required')).min(1, 'At least one member name is required'),
  memberEmails: z.array(z.email('Invalid email address')).min(1, 'At least one member email is required'),
  memberPhoneNumbers: z.array(z.string().min(1, 'Member phone number is required')).min(1, 'At least one member phone number is required'),
})

export const loginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

export const createPaymentBody = z.object({
  registrationId: z.string().min(1),
});

export const createSubmissionSchema = z.object({
  teamId: z.string().min(1, 'Team id is required').optional(),
  userId: z.string().min(1, 'User id is required').optional(),
  fileUrl: z.url('Invalid file URL').min(1, 'File URL is required'),
})

export const createFeedbackSchema = z.object({
  adminId: z.string().min(1, 'Admin id is required'),
  message: z.string().min(1, 'Feedback message is required'),
})

export type CreateFeedbackSchema = z.infer<typeof createFeedbackSchema>;
export type CreateSubmissionSchema = z.infer<typeof createSubmissionSchema>;
export type CreatePaymentBody = z.infer<typeof createPaymentBody>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type RegistrationTeamSchema = z.infer<typeof registrationTeamSchema>;
export type RegistrationIndividualSchema = z.infer<typeof registrationIndividualSchema>;
export type CompetitionSchema = z.infer<typeof competitionSchema>;
export type UserSchema = z.infer<typeof userSchema>;