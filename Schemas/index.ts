import * as z from 'zod';

export const RegisterSchema = z.object({
    username: z.string().min(4).max(30),
    email: z.string().email(),
    password: z.string().min(8)
})

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})
