import {
  formWrapper,
  formStyle,
  formInputField,
} from "../../styles/formLayout.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useState } from "react";
import type { ChangeEvent } from "react";

interface FormData {
  userId: string;
  password: string;
  name: string;
  email: string;
  age: number | undefined;
}

const SignUpPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    userId: "",
    password: "",
    name: "",
    email: "",
    age: undefined,
  });

  const handleInputChange =
    (field: keyof FormData) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = field === "age" ? Number(e.target.value) : e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < 3) {
      handleNextStep();
      return;
    }
    alert("회원가입 완료");
    console.log("최종 데이터:", JSON.stringify(formData));
  };

  const stepForm = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className={formInputField}>
              <label>아이디</label>
              <Input
                value={formData.userId}
                placeholder="아이디를 입력해주세요"
                type="text"
                onChange={handleInputChange("userId")}
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className={formInputField}>
              <label>비밀번호</label>
              <Input
                value={formData.password}
                placeholder="비밀번호를 입력해주세요"
                type="password"
                onChange={handleInputChange("password")}
              />
            </div>
            <div className={formInputField}>
              <label>비밀번호 확인</label>
              <Input
                value={formData.password}
                placeholder="비밀번호를 한번 더 입력해주세요"
                type="password"
                onChange={() => console.log("1")}
              />
            </div>
          </>
        );

      case 3:
        return (
          <>
            <div className={formInputField}>
              <label>이름</label>
              <Input
                value={formData.name}
                placeholder="이름을 입력해주세요"
                type="text"
                onChange={handleInputChange("name")}
              />
            </div>
            <div className={formInputField}>
              <label>이메일</label>
              <Input
                value={formData.email}
                placeholder="name@example.com"
                type="email"
                onChange={handleInputChange("email")}
              />
            </div>
            <div className={formInputField}>
              <label>나이</label>
              <Input
                value={formData.age}
                placeholder="숫자로 입력해주세요"
                type="number"
                onChange={handleInputChange("age")}
              />
            </div>
          </>
        );
    }
  };

  return (
    <div className={formWrapper}>
      <form className={formStyle} onSubmit={handleSubmit}>
        <h2>회원가입</h2>
        {stepForm()}
        {step < 3 ? (
          <Button type="submit">다음</Button>
        ) : (
          <Button type="submit">가입하기</Button>
        )}
      </form>
    </div>
  );
};

export default SignUpPage;
