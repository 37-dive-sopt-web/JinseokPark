import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { useLogin } from "../../hooks/useLogin";
import {
  formWrapper,
  formInputField,
  formBtnContainer,
  formStyle,
} from "../../styles/formLayout.css";

const LoginPage = () => {
  const {
    loginData,
    isValid,
    handleSubmit,
    handleInputChange,
    handleGoSignUp,
  } = useLogin();
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
            <Input
              value={loginData.password}
              placeholder="비밀번호를 입력해주세요"
              type="text"
              onChange={handleInputChange("password")}
              id="login-pwd"
            />
          </div>
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
