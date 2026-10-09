"use client";

import { environmentManager, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react";

function MakeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000
            }
        }
    })
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
    if (environmentManager.isServer()) {
        return MakeQueryClient()
    } else {
        if (!browserQueryClient) {
            browserQueryClient = MakeQueryClient();
        }
        return browserQueryClient
    }
}

export default function QueryProvider({ children }: { children: ReactNode }) {

    const queryClient = getQueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )

}