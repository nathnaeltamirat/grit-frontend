import z from 'zod';

export const registerSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email('Invalid Email')),
  full_name: z
    .string()
    .trim()
    .min(3, 'Name is too short')
    .refine((val) => val.split(' ').filter(Boolean).length == 2, {
      message: 'Please enter your first and last name',
    }),
  password: z.string().min(8, 'Weak password'),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email('Invalid Email')),
  password: z.string().min(8, 'Weak password'),
});

export type loginFormInput = z.input<typeof loginSchema>;
export type registerFormInput = z.input<typeof registerSchema>;
