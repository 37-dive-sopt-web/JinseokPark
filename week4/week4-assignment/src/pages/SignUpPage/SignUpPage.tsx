import {
  formWrapper,
  formStyle,
  formInputField,
} from "../../styles/formLayout.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useSignUp } from "../../hooks/useSignUp";

const SignUpPage = () => {
  const {
    step,
    formData,
    handleInputChange,
    passwordConfirm,
    handlePasswordConfirm,
    handleSubmit,
    isValid,
  } = useSignUp();

  // 단계에 따라 다른 폼 렌더링
  const stepForm = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className={formInputField}>
              <label>아이디</label>
              <Input
                value={formData.username}
                placeholder="아이디를 입력해주세요"
                type="text"
                onChange={handleInputChange("username")}
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
                value={passwordConfirm}
                placeholder="비밀번호를 한번 더 입력해주세요"
                type="password"
                onChange={handlePasswordConfirm}
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
          <Button type="submit" disabled={!isValid}>
            다음
          </Button>
        ) : (
          <Button type="submit" disabled={!isValid}>
            가입하기
          </Button>
        )}
      </form>
    </div>
  );
};

export default SignUpPage;
