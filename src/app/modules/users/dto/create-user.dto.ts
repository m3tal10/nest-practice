import { z } from 'zod';
export const createUserSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[\W_]/, 'Password must contain at least one special character'),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
