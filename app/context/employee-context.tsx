import { createContext, useContext, ReactNode } from "react";
import { User } from "@prisma/client";

interface EmployeeContextType {
  employee: User | null;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(
  undefined
);

export function useEmployeeContext() {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error(
      "useEmployeeContext must be used within a EmployeeContextProvider"
    );
  }
  return context;
}

export const EmployeeContextProvider = ({
  children,
  employee,
}: {
  children: ReactNode;
  employee: User | null;
}) => (
  <EmployeeContext.Provider value={{ employee }}>
    {children}
  </EmployeeContext.Provider>
);
