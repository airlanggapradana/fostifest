import {z} from 'zod';

export const loginSchema = z.object({
  email: z.email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

export const registerSchema = z.object({
  email: z.email('Invalid email address').min(1, 'Email is required'),
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone number is required').regex(/^\+?\d{10,15}$/, 'Invalid phone number format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string().min(6, 'Confirm Password must be at least 6 characters long'),
  institusi: z.string().min(1, 'Institution is required'),
}).refine(res => res.password === res.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword', 'password'],
})

export const registrationIndividualSchema = z.object({
  competitionId: z.string().min(1, 'Competition id is required'),
  userId: z.string().min(1, 'User id is required'),
})

export const registrationTeamSchema = z.object({
  competitionId: z.string().min(1, 'Competition id is required'),
  leaderId: z.string().min(1, 'Leader id is required'),
  teamName: z.string().min(1, 'Team name is required'),
  memberNames: z.array(z.string().min(1, 'Member name is required')).min(1, 'At least one member name is required'),
  memberEmails: z.array(z.email('Invalid email address')).min(1, 'At least one member email is required'),
  memberPhoneNumbers: z.array(z.string().min(1, 'Member phone number is required')).min(1, 'At least one member phone number is required'),
})

export const paymentSchema = z.object({
  registrationId: z.string().min(1, 'Registration id is required'),
})

export const sendSubmissionSchema = z.object({
  fileUrl: z.instanceof(File).nullable(), // validasi file
  userId: z.string().min(1, 'User id is required').optional(),
  teamId: z.string().min(1, 'Team id is required').optional(),
})

export const sendFeedbackSchema = z.object({
  message: z.string().min(1, 'Feedback message is required'),
})

export const updateProfileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email address').min(1, 'Email is required'),
  phone: z.string().min(1, 'Phone number is required').regex(/^\+?\d{10,15}$/, 'Invalid phone number format'),
  institusi: z.string().min(1, 'Institution is required'),
})

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
export type SendFeedbackSchema = z.infer<typeof sendFeedbackSchema>;
export type SendSubmissionSchema = z.infer<typeof sendSubmissionSchema>;
export type PaymentSchema = z.infer<typeof paymentSchema>;
export type RegistrationIndividualSchema = z.infer<typeof registrationIndividualSchema>;
export type RegistrationTeamSchema = z.infer<typeof registrationTeamSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;