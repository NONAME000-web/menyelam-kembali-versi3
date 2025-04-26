"use client"

import * as z from "zod"
import React, { useState } from 'react'
import { Form, FormControl, FormItem, FormField, FormLabel, FormMessage } from "../ui/form"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { Button } from "../ui/button"
import { Input } from "@/components/ui/input"
import { CardWrapper } from "./CardWrapper"
import { SuccessForm } from "../SuccessForm"
import { ErrorForm } from "../ErrorForm"
import { Login } from "@/app/actions/login"
import { useTransition } from "react"
import { LoginSchema } from "@/Schemas"

const LoginForm = () => {
    const [success, setSuccess] = useState<string | undefined>(undefined)
    const [error, setError] = useState<string | undefined>(undefined)
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setSuccess(undefined)
        setError(undefined)
        startTransition(() => {
            Login(values).then((data) => {
                if(data && "error" in data && data.error){
                    setError(typeof data.error === "string" ? data.error : "Something Wrong")
                  }
                  if(data && "success" in data && data.success){
                    setSuccess(typeof data.success === "string" ? data.success : "Login success")
                  }
            })
        })
    }

  return (
    <CardWrapper headerLabel="Welcome In Page Login" backButtonHref="/auth/register" backButtonLabel="Have Not Any Account ?" showSocial>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <FormField control={form.control} name="email" render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input disabled={isPending} placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name="password" render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input disabled={isPending} {...field} type="password" placeholder="Enter your password"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                </div>
                {error && <ErrorForm message={error} />}
                {success && <SuccessForm message={success} />}
                <Button disabled={isPending} type="submit" className="w-full" variant={"default"}>Login</Button>
            </form>
        </Form>
    </CardWrapper>
  )
}

export default LoginForm