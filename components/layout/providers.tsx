"use client";
import React from "react";
import ThemeProvider from "./theme-provider";
import SessionContext from "./SessionContext";
import { User } from "@/app/interfaces/user.interface";

interface ProvidersProps {
  children: React.ReactNode;
  session: User | null;
}

export default function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionContext.Provider value={{ session }}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </SessionContext.Provider>
  );
}
