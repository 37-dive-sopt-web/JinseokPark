import type { ChangeEvent } from "react";
import { getInfo } from "../api/auth";
import { useState, useCallback, useEffect } from "react";

interface UserData {
  username?: string;
  name: string;
  email: string;
  age: number;
}

export const useMemberInfo = () => {
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState<UserData>({
    username: "",
    name: "",
    email: "",
    age: 0,
  });
  const [isValid, setIsValid] = useState(false);
  const [isSearched, setSearched] = useState(false);
  const [isBtnValid, setIsBtnValid] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) return;

    try {
      const response = await getInfo(Number(userId));
      setUserData(response.data);
      setIsValid(true);
      setSearched(true);
    } catch (error) {
      setIsValid(false);
      setSearched(true);
      console.error("멤버 조회 API 호출 실패:", error);
    }
  };

  const validateExam = useCallback((): boolean => {
    let isBtnValid = true;
    if (userId === "" || userId.trim() === "") {
      isBtnValid = false;
    }
    return isBtnValid;
  }, [userId]);

  // useEffect 활용 유효성 검사
  useEffect(() => {
    setIsBtnValid(validateExam());
  }, [userId, validateExam]);

  return {
    userId,
    isBtnValid,
    userData,
    isSearched,
    isValid,
    handleInputChange,
    handleSubmit,
  };
};
