import { useState, type ChangeEvent } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import {
  formWrapper,
  formInputField,
  formBtnContainer,
  formStyle,
} from "../../styles/formLayout.css";
import { useNavigate } from "react-router-dom";
import type { LoginRequest } from "../../types/auth";
import { logIn } from "../../api/auth";
import { useUserInfo } from "../../hooks/useUserInfo";
interface LoginData {
  username: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });
  const { setUserId } = useUserInfo();

  const handleInputChange =
    (field: keyof LoginData) => (e: ChangeEvent<HTMLInputElement>) => {
      setLoginData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: LoginRequest = {
      username: loginData.username,
      password: loginData.password,
    };

    try {
      const response = await logIn(data);
      alert(`로그인 성공! ${response.data.userId}`);
      setUserId(response.data.userId);
      navigate("/mypage");
    } catch (error) {
      alert(`로그인 실패. 오류가 발생했습니다. ${error}`);
    }
  };

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
            <Button type="submit">로그인</Button>
            <Button onClick={() => navigate("/signup")}>회원가입</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
