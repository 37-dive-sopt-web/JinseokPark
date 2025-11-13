import { createContext } from "react";

export interface UserContextType {
  userId: number;
  userName: string;
  setUserId: (id: number) => void;
  setUserName: (name: string) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);
