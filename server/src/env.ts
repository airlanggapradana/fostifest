import {z} from 'zod';

const envSchema = z.object({
  PORT: z.string(),
  JWT_SECRET: z.string(),
  MIDTRANS_SERVER_KEY: z.string(),
  MIDTRANS_CLIENT_KEY: z.string(),
  MIDTRANS_IS_PRODUCTION: z.string().transform(val => val === 'true'),
})

export const env = envSchema.parse(process.env);