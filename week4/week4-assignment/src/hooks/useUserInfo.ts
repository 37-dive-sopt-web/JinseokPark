import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const useUserInfo = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("아이디를 가져오지 못했습니다.");
  }
  return context;
};
