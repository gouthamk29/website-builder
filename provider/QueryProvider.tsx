'use client'

import { QueryClientProvider,QueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface Props {
    children:React.ReactNode;
}

export default function QueryProvider({children}:Props){

    const [localClient]= useState(()=>new QueryClient());

    return (
        <QueryClientProvider client={localClient}>
            {children}
        </QueryClientProvider>)
}
