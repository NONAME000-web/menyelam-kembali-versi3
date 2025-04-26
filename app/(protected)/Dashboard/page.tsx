"use client";
import React from 'react'
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
    const {data: session} = useSession()

    const HandleSignOut = async() => {
        await signOut({redirect: true, callbackUrl: "/auth/login"})
    }
    
  return (
    <div>
        Dashboard
        
        {session ? (
            <h1>Welcome, {session.user?.name}</h1>
        ) : (
            <h1>Loading</h1>
        )}

        <span><Button onClick={HandleSignOut} variant={"outline"}>SignOut</Button></span>
    </div>
  )
}

export default Dashboard