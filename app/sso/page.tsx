'use client'

import {useEffect} from "react";
import {Spinner} from "@shared/components/ui/spinner";
import {useAuthService} from "@features/auth";

export default function Page () {
    const authService = useAuthService()
    useEffect(() => {
        authService.signIn()
    }, [])

    return (
        <main className="min-h-screen bg-zinc-950 overflow-hidden">
            <Spinner></Spinner>
        </main>
    )
}