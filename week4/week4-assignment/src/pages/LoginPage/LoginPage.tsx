import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import {
  formWrapper,
  formInputField,
  formBtnContainer,
  formStyle,
} from "../../styles/formLayout.css";

const LoginPage = () => {
  return (
    <div className={formWrapper}>
      <form className={formStyle}>
        <h2>로그인</h2>
        <div className={formInputField}>
          <label>아이디</label>
          <Input
            value=""
            placeholder="아이디를 입력해주세요"
            type="text"
            onChange={() => console.log("1")}
          />
        </div>
        <div className={formInputField}>
          <label>비밀번호</label>
          <Input
            value=""
            placeholder="비밀번호를 입력해주세요"
            type="text"
            onChange={() => console.log("1")}
          />
        </div>
        <div className={formBtnContainer}>
          <Button>로그인</Button>
          <Button>회원가입</Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
