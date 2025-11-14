import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { useLogin } from "../../hooks/useLogin";
import { loginFailedStyle } from "./LoginPage.css";
import {
  formWrapper,
  formInputField,
  formBtnContainer,
  formStyle,
} from "../../styles/formLayout.css";
import { useSignUp } from "../../hooks/useSignUp";
import { passwordContainerStyle } from "../../styles/formLayout.css";

const LoginPage = () => {
  const {
    loginData,
    isValid,
    isLoginFailed,
    handleSubmit,
    handleInputChange,
    handleGoSignUp,
  } = useLogin();
  const { showPassword, toggleShowPassword } = useSignUp();

  return (
    <div style={{ height: "100vh" }}>
      <div className={formWrapper}>
        <form className={formStyle} onSubmit={handleSubmit}>
          <h2>로그인</h2>
          <div className={formInputField}>
            <label htmlFor="login-id">아이디</label>
            <Input
              value={loginData.username}
              placeholder="아이디를 입력해주세요"
              type="text"
              onChange={handleInputChange("username")}
              id="login-id"
            />
          </div>
          <div className={formInputField}>
            <label htmlFor="login-pwd">비밀번호</label>
            <div className={passwordContainerStyle}>
              <Input
                value={loginData.password}
                placeholder="비밀번호를 입력해주세요"
                type={showPassword ? "text" : "password"}
                onChange={handleInputChange("password")}
                id="login-pwd"
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
          {isLoginFailed && (
            <div className={loginFailedStyle}>
              <p>로그인 정보가 맞지 않습니다</p>
            </div>
          )}
          <div className={formBtnContainer}>
            <Button type="submit" disabled={!isValid}>
              로그인
            </Button>
            <Button type="button" onClick={handleGoSignUp}>
              회원가입
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
