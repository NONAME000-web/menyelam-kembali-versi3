"use server"
import { RegisterSchema } from '@/Schemas';
import { Database } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import * as z from "zod";
// import argon2 from 'argon2';
import bcrypt from 'bcryptjs';

export const Register = async(values: z.infer<typeof RegisterSchema>) => {
    const validatedData = RegisterSchema.safeParse(values);
    if(!validatedData.success) return {error: "Invalid Fields"}

    const { email, password, username } = validatedData.data

    const hashedPass = await bcrypt.hash(password, 10);
    const userExist = await getUserByEmail(email);
    if(userExist) return {error: "User already exists"}

    await Database.user.create({
        data: {
            email,
            password: hashedPass,
            name: username
        },
    });

    return {success: "User created successfully"}
}