"use client"
import React from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { CardWrapper } from "@/components/auth/CardWrapper"
import { SuccessForm } from "@/components/SuccessForm"
import { ErrorForm } from "@/components/ErrorForm"
import { Register } from "@/app/actions/register"
import {RegisterSchema} from "@/Schemas"
import { useTransition } from "react"

const RegisterForm = () => {
    const [success, setSuccess] = React.useState<string | undefined>(undefined)
    const [error, setError] = React.useState<string | undefined>(undefined)
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            username: ""
        }
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setSuccess(undefined)
        setError(undefined)
        startTransition(() => {
            Register(values).then((data) => {
                setSuccess(data.success)
                setError(data.error)
            })
        })
    }

  return (
    <CardWrapper headerLabel='Welcome In Page Registration' backButtonLabel='Have Account ?' backButtonHref='/auth/login' showSocial>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className='space-y-4'>
                    <FormField control={form.control} name='username' render={({field}) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input disabled={isPending} placeholder='Enter your username' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name='email' render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input disabled={isPending} placeholder='Enter your email' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name='password' render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input disabled={isPending} placeholder='Enter your password'type='password' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                </div>
                {error && <ErrorForm message={error} />}
                {success && <SuccessForm message={success} />}
                <Button type='submit' disabled={isPending} className='w-full' variant='default'>Register</Button>
            </form>
        </Form>
    </CardWrapper>
  )
}

export default RegisterForm