import {
  formWrapper,
  formStyle,
  formInputField,
} from "../../styles/formLayout.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useSignUp } from "../../hooks/useSignUp";
import { useNavigate } from "react-router-dom";
import { goLoginStyle } from "./SignUpPage.css";
import { passwordContainerStyle } from "../../styles/formLayout.css";

const SignUpPage = () => {
  const {
    step,
    formData,
    handleInputChange,
    passwordConfirm,
    handlePasswordConfirm,
    handleSubmit,
    isValid,
    isIdValid,
    passwordError,
    passwordConfirmError,
    showPassword,
    toggleShowPassword,
    showPasswordConfirm,
    toggleShowPasswordConfirm,
  } = useSignUp();
  const navigate = useNavigate();

  // 단계에 따라 다른 폼 렌더링
  const stepForm = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className={formInputField}>
              <label htmlFor="signup-id">아이디</label>
              <Input
                value={formData.username}
                placeholder="아이디를 입력해주세요"
                type="text"
                onChange={handleInputChange("username")}
                id="signup-id"
              />
            </div>
            {!isIdValid && (
              <div>
                <p>아이디는 50자를 초과할 수 없습니다.</p>
              </div>
            )}
          </>
        );
      case 2:
        return (
          <>
            <div className={formInputField}>
              <label htmlFor="signup-pwd">비밀번호</label>
              <div className={passwordContainerStyle}>
                <Input
                  value={formData.password}
                  placeholder="비밀번호를 입력해주세요"
                  type={showPassword ? "text" : "password"}
                  onChange={handleInputChange("password")}
                  id="signup-pwd"
                />
                <button type="button" onClick={toggleShowPassword}>
                  {showPassword ? (
                    <i className="fa-regular fa-eye-slash"></i>
                  ) : (
                    <i className="fa-regular fa-eye"></i>
                  )}
                </button>
              </div>
            </div>
            {passwordError && (
              <div>
                <p>{passwordError}</p>
              </div>
            )}
            <div className={formInputField}>
              <label htmlFor="signup-pwdConfirm">비밀번호 확인</label>
              <div className={passwordContainerStyle}>
                <Input
                  value={passwordConfirm}
                  placeholder="비밀번호를 한번 더 입력해주세요"
                  type={showPasswordConfirm ? "text" : "password"}
                  onChange={handlePasswordConfirm}
                  id="signup-pwdConfirm"
                />
                <button type="button" onClick={toggleShowPasswordConfirm}>
                  {showPasswordConfirm ? (
                    <i className="fa-regular fa-eye-slash"></i>
                  ) : (
                    <i className="fa-regular fa-eye"></i>
                  )}
                </button>
              </div>
            </div>
            {passwordConfirmError && (
              <div>
                <p>비밀번호가 일치하지 않습니다.</p>
              </div>
            )}
          </>
        );

      case 3:
        return (
          <>
            <div className={formInputField}>
              <label htmlFor="signup-name">이름</label>
              <Input
                value={formData.name}
                placeholder="이름을 입력해주세요"
                type="text"
                onChange={handleInputChange("name")}
                id="signup-name"
              />
            </div>
            <div className={formInputField}>
              <label htmlFor="signup-email">이메일</label>
              <Input
                value={formData.email}
                placeholder="name@example.com"
                type="email"
                onChange={handleInputChange("email")}
                id="signup-email"
              />
            </div>
            <div className={formInputField}>
              <label htmlFor="signup-age">나이</label>
              <Input
                value={formData.age}
                placeholder="숫자로 입력해주세요"
                type="number"
                onChange={handleInputChange("age")}
                id="signup-age"
              />
            </div>
          </>
        );
    }
  };

  return (
    <div style={{ height: "100vh" }}>
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
        <div className={goLoginStyle}>
          <p>계정이 이미 있으신가요?</p>
          <span onClick={() => navigate("/")}>로그인으로 돌아가기</span>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
