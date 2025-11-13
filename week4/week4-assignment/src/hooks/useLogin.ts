import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { LoginRequest } from "../types/auth";
import { logIn } from "../api/auth";
import { useUserInfo } from "./useUserInfo";

import { useCallback, useEffect } from "react";

interface LoginData {
  username: string;
  password: string;
}

export const useLogin = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });
  const { setUserId } = useUserInfo();
  const [isValid, setIsValid] = useState(false);
  const [isLoginFailed, setIsLoginFailed] = useState(false);

  const handleInputChange =
    (field: keyof LoginData) => (e: ChangeEvent<HTMLInputElement>) => {
      setLoginData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleGoSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/signup");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: LoginRequest = {
      username: loginData.username,
      password: loginData.password,
    };

    try {
      const response = await logIn(data);
      setUserId(response.data.userId);
      navigate("/mypage");
    } catch (error) {
      setIsLoginFailed(true);
      console.error("로그인 실패:", error);
    }
  };

  const validateExam = useCallback((): boolean => {
    let isValid = true;
    const requiredInput: string[] = [loginData.username, loginData.password];

    if (
      requiredInput.some(
        (value) => !value || (typeof value === "string" && value.trim() === "")
      )
    ) {
      isValid = false;
    }

    return isValid;
  }, [loginData]);

  // useEffect 활용 유효성 검사
  useEffect(() => {
    setIsValid(validateExam());
  }, [loginData, validateExam]);

  return {
    handleSubmit,
    loginData,
    handleInputChange,
    isValid,
    handleGoSignUp,
    isLoginFailed,
  };
};
