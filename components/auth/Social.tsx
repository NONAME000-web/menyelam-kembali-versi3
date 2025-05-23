"use client"

import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import {signIn} from "next-auth/react"
import { Button } from "../ui/button"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

export const Social = () => {
    const onCLick = (provider: "google" | "github") => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        })
    }

    return(
        <div className="flex w-full gap-x-2">
            <Button size={"lg"} className="flex-1" variant={"outline"} onClick={() => onCLick("google")}>
                <FcGoogle/>With Google
            </Button>
            <Button size={"lg"} className="flex-1" variant={"outline"} onClick={() => onCLick("github")}>
                <FaGithub/>With Github
            </Button>
        </div>
    )
}