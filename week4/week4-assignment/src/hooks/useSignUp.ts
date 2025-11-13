import { useState, useEffect, useCallback } from "react";
import type { ChangeEvent } from "react";
import { signUp } from "../api/auth";
import type { SignUpRequest } from "../types/auth";
import { useNavigate } from "react-router-dom";

interface FormData {
  username: string;
  password: string;
  name: string;
  email: string;
  age: number | undefined;
}

export const useSignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    name: "",
    email: "",
    age: undefined,
  });
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [isValid, setIsValid] = useState(false);

  // 인풋에 작성한 값 formData로 저장
  const handleInputChange =
    (field: keyof FormData) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = field === "age" ? Number(e.target.value) : e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  // 비밀번호 확인 인풋 관리
  const handlePasswordConfirm = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
  };

  // 다음 스텝으로 이동
  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  // 최종 제출 (api 연동 회원가입)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < 3) {
      handleNextStep();
      return;
    }

    const data: SignUpRequest = {
      username: formData.username,
      password: formData.password,
      name: formData.name,
      email: formData.email,
      age: formData.age !== undefined ? formData.age : 0,
    };

    try {
      const response = await signUp(data);
      alert(`회원가입 성공! ${response.data.name}님 반갑습니다!`);
      navigate("/");
    } catch (error) {
      alert(`회원가입 실패. 오류가 발생했습니다. ${error}`);
    }
  };

  // 유효성 검사 (빈 인풋, 비밀번호 불일치)
  const validateExam = useCallback((): boolean => {
    let isValid = true;
    let requiredInput: (string | number | undefined)[] = [];

    if (step === 1) {
      requiredInput = [formData.username];
    } else if (step === 2) {
      requiredInput = [formData.password, passwordConfirm];
    } else if (step === 3) {
      requiredInput = [formData.name, formData.email, formData.age];
    }

    if (
      requiredInput.some(
        (value) => !value || (typeof value === "string" && value.trim() === "")
      )
    ) {
      isValid = false;
    }

    if (step === 2 && isValid && formData.password !== passwordConfirm) {
      isValid = false;
    }

    return isValid;
  }, [formData, passwordConfirm, step]);

  // useEffect 활용 유효성 검사
  useEffect(() => {
    setIsValid(validateExam());
  }, [formData, passwordConfirm, step, validateExam]);

  return {
    step,
    formData,
    handleInputChange,
    passwordConfirm,
    handlePasswordConfirm,
    handleSubmit,
    isValid,
  };
};
