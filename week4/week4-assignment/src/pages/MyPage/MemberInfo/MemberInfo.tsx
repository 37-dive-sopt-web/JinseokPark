import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import type { ChangeEvent } from "react";
import { getInfo } from "../../../api/auth";
import { useState } from "react";
import {
  formWrapper,
  formStyle,
  formInputField,
} from "../../../styles/formLayout.css";
import { memberInfoStyle, infoItem, noResultStyle } from "./MemberInfo.css";

interface UserData {
  username?: string;
  name: string;
  email: string;
  age: number;
}

const MemberInfo = () => {
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [userData, setUserData] = useState<UserData>({
    username: "",
    name: "",
    email: "",
    age: 0,
  });
  const [isValid, setIsValid] = useState(false);
  const [isSearched, setSearched] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setUserId(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) return;

    try {
      const response = await getInfo(userId);
      alert("성공!");
      setUserData(response.data);
      setIsValid(true);
      setSearched(true);
    } catch (error) {
      alert(`불러오기 실패. ${error}`);
      setIsValid(false);
      setSearched(true);
    }
  };

  return (
    <div className={formWrapper}>
      <form className={formStyle} onSubmit={handleSubmit}>
        <h2>회원 조회</h2>
        <div className={formInputField}>
          <label htmlFor="memberInfo-id">회원 ID</label>
          <Input
            value={userId}
            placeholder="회원 아이디를 입력해주세요(숫자만 입력)"
            type="number"
            onChange={handleInputChange}
            id="memberInfo-id"
          />
        </div>
        <Button type="submit">확인</Button>
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
