import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import {
  formInputField,
  formStyle,
  formWrapper,
} from "../../styles/formLayout.css";

import { headerStyle, myPageStyle, idSectionStyle } from "./MyPage.css";

const MyPage = () => {
  return (
    <div className={myPageStyle}>
      <header className={headerStyle}>
        <div>
          <h2>마이페이지</h2>
          <p>안녕하세요, 박진석님</p>
        </div>
        <nav>
          <p>내 정보</p>
          <p>회원 조회</p>
          <p>로그아웃</p>
          <p>회원 탈퇴</p>
        </nav>
      </header>
      <div className={formWrapper}>
        <form className={formStyle}>
          <h2>내 정보</h2>
          <div className={idSectionStyle}>
            <p>아이디</p>
            <p>doogy03</p>
          </div>
          <div className={formInputField}>
            <label htmlFor="member-name">이름</label>
            <Input
              value="박진석"
              placeholder="수정할 이름을 입력해주세요."
              type="text"
              onChange={() => console.log(1)}
              id="member-name"
            />
          </div>
          <div className={formInputField}>
            <label htmlFor="member-email">이메일</label>
            <Input
              value="test@test.com"
              placeholder="수정할 이메일을 입력해주세요."
              type="text"
              onChange={() => console.log(1)}
              id="member-email"
            />
          </div>
          <div className={formInputField}>
            <label htmlFor="member-age">나이</label>
            <Input
              value="23"
              placeholder="수정할 나이를 입력해주세요."
              type="text"
              onChange={() => console.log(1)}
              id="member-age"
            />
          </div>
          <Button>저장</Button>
        </form>
      </div>
    </div>
  );
};

export default MyPage;
