"use client";
import React from "react";
import ThemeProvider from "./theme-provider";
import SessionContext from "./SessionContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { User } from "@/app/interfaces/user.interface";

interface ProvidersProps {
  children: React.ReactNode;
  session: User | null;
}

const queryClient = new QueryClient();

export default function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionContext.Provider value={{ session }}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </SessionContext.Provider>
  );
}
