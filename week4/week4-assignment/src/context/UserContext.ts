import { createContext } from "react";

export interface UserContextType {
  userId: number;
  setUserId: (id: number) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);
