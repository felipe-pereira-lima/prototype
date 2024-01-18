import { User } from "@prisma/client";
import { createContext, useContext } from "react";

// Create the context with the defined type, initially undefined
export const UserContext = createContext<User | undefined>(undefined);

// Custom hook to use the UserContext
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserContext.Provider");
  }
  return context;
}
