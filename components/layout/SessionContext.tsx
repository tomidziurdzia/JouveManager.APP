"use client";

import { createContext, useContext } from "react";
import { User } from "@/app/interfaces/user.interface";

type SessionContextType = {
  session: User | null;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}

export default SessionContext;
