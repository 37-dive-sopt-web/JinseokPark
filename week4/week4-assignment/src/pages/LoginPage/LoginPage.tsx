import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import {
  formWrapper,
  formInputField,
  formBtnContainer,
  formStyle,
} from "../../styles/formLayout.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className={formWrapper}>
      <form className={formStyle}>
        <h2>로그인</h2>
        <div className={formInputField}>
          <label htmlFor="login-id">아이디</label>
          <Input
            value=""
            placeholder="아이디를 입력해주세요"
            type="text"
            onChange={() => console.log("1")}
            id="login-id"
          />
        </div>
        <div className={formInputField}>
          <label htmlFor="login-pwd">비밀번호</label>
          <Input
            value=""
            placeholder="비밀번호를 입력해주세요"
            type="text"
            onChange={() => console.log("1")}
            id="login-pwd"
          />
        </div>
        <div className={formBtnContainer}>
          <Button>로그인</Button>
          <Button onClick={() => navigate("/signup")}>회원가입</Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
