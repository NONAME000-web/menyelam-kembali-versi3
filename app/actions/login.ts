"use server"

import { LoginSchema } from '@/Schemas';
import { signIn } from '@/auth';
import { getUserByEmail } from '@/data/user';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import * as z from "zod";

export const Login = async(values: z.infer<typeof LoginSchema>) => {
    const validatedData = LoginSchema.safeParse(values);
    if(!validatedData.success) return {error: "Invalid Fields"}

    const { email, password } = validatedData.data

    const user = await getUserByEmail(email);
    if(!user) return {error: "User not found"}

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch(err){
        if(err instanceof AuthError){
            if (err.message === "CredentialsSignin") {
                return {error: "Invalid credentials"}
            } else {
                return {error: "Invalid Account"}
            }
        }
        throw err
    }
}