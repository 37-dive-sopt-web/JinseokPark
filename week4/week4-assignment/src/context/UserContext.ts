import { createContext } from "react";

export interface UserContextType {
  userId: number | null;
  userName: string;
  setUserId: (id: number | null) => void;
  setUserName: (name: string) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);
