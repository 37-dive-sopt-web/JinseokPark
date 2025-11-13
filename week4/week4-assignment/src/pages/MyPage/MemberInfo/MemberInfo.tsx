import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import {
  formWrapper,
  formStyle,
  formInputField,
} from "../../../styles/formLayout.css";
import { memberInfoStyle, infoItem, noResultStyle } from "./MemberInfo.css";
import { useMemberInfo } from "../../../hooks/useMemberInfo";

const MemberInfo = () => {
  const {
    userId,
    isBtnValid,
    userData,
    isSearched,
    isValid,
    handleInputChange,
    handleSubmit,
  } = useMemberInfo();

  return (
    <div className={formWrapper}>
      <form className={formStyle} onSubmit={handleSubmit}>
        <h2>회원 조회</h2>
        <div className={formInputField}>
          <label htmlFor="memberInfo-id">회원 ID</label>
          <Input
            value={userId}
            placeholder="회원 아이디를 입력해주세요(숫자만 입력)"
            type="text"
            onChange={handleInputChange}
            id="memberInfo-id"
          />
        </div>
        <Button type="submit" disabled={!isBtnValid}>
          확인
        </Button>
      </form>
      {isValid ? (
        <div className={memberInfoStyle}>
          <h3>조회된 회원 정보</h3>

          <div className={infoItem}>
            <span>이름</span>
            <span>{userData.name}</span>
          </div>
          <div className={infoItem}>
            <span>아이디</span>
            <span>{userData.username}</span>
          </div>
          <div className={infoItem}>
            <span>이메일</span>
            <span>{userData.email}</span>
          </div>
          <div className={infoItem}>
            <span>나이</span>
            <span>{userData.age}</span>
          </div>
        </div>
      ) : (
        isSearched && (
          <div className={noResultStyle}>
            <h3>일치하는 회원 정보가 없습니다.</h3>
          </div>
        )
      )}
    </div>
  );
};

export default MemberInfo;
