import { useState } from "react";
import type { ReactNode } from "react";
import { UserContext } from "./UserContext";
import type { UserContextType } from "./UserContext";

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userId, setUserId] = useState<number>(0);

  const contextValue: UserContextType = {
    userId,
    setUserId,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
