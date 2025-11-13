import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";

import {
  formInputField,
  formStyle,
  formWrapper,
} from "../../../styles/formLayout.css";
import { idSectionStyle } from "./MyPage.css";
import { useEditMyPage } from "../../../hooks/useEditMyPage";

const MyPage = () => {
  const { userData, handleEdit, handleInputChange } = useEditMyPage();

  return (
    <div className={formWrapper}>
      <form className={formStyle} onSubmit={handleEdit}>
        <h2>내 정보</h2>
        <div className={idSectionStyle}>
          <p>아이디</p>
          <p>{userData.username}</p>
        </div>
        <div className={formInputField}>
          <label htmlFor="member-name">이름</label>
          <Input
            value={userData.name}
            placeholder="수정할 이름을 입력해주세요."
            type="text"
            onChange={handleInputChange("name")}
            id="member-name"
          />
        </div>
        <div className={formInputField}>
          <label htmlFor="member-email">이메일</label>
          <Input
            value={userData.email}
            placeholder="수정할 이메일을 입력해주세요."
            type="text"
            onChange={handleInputChange("email")}
            id="member-email"
          />
        </div>
        <div className={formInputField}>
          <label htmlFor="member-age">나이</label>
          <Input
            value={userData.age}
            placeholder="수정할 나이를 입력해주세요."
            type="number"
            onChange={handleInputChange("age")}
            id="member-age"
          />
        </div>
        <Button>저장</Button>
      </form>
    </div>
  );
};

export default MyPage;
