import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import {
  formInputField,
  formStyle,
  formWrapper,
} from "../../styles/formLayout.css";

import { headerStyle, myPageStyle, idSectionStyle } from "./MyPage.css";
import { useEffect, useState } from "react";
import { useUserInfo } from "../../hooks/useUserInfo";
import { getInfo, editInfo } from "../../api/auth";
import type { ChangeEvent } from "react";
import type { editInfoRequest } from "../../types/auth";
import { useNavigate } from "react-router-dom";

interface UserData {
  username?: string;
  name: string;
  email: string;
  age: number;
}

const MyPage = () => {
  const [userData, setUserData] = useState<UserData>({
    username: "",
    name: "",
    email: "",
    age: 0,
  });
  const { userId } = useUserInfo();
  const [refreshKey, setRefreshKey] = useState(0);
  const [displayName, setDisplayName] = useState("");
  const navigate = useNavigate();

  const handleInputChange =
    (field: keyof UserData) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = field === "age" ? Number(e.target.value) : e.target.value;
      setUserData((prev) => ({ ...prev, [field]: value }));
    };

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      try {
        const response = await getInfo(userId);
        setUserData(response.data);
        setDisplayName(response.data.name);
      } catch (error) {
        alert(`불러오기 실패. ${error}`);
      }
    };

    fetchData();
  }, [refreshKey, userId]);

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: editInfoRequest = {
      name: userData.name,
      email: userData.email,
      age: userData.age,
    };

    try {
      const response = await editInfo(userId, data);
      alert(`수정 성공 ${response}`);
      setRefreshKey((prev) => prev + 1);
      navigate("/mypage");
    } catch (error) {
      alert(`정보 수정 실패. ${error}`);
    }
  };

  return (
    <div className={myPageStyle}>
      <header className={headerStyle}>
        <div>
          <h2>마이페이지</h2>
          <p>안녕하세요, {displayName}님</p>
        </div>
        <nav>
          <p>내 정보</p>
          <p>회원 조회</p>
          <p>로그아웃</p>
          <p>회원 탈퇴</p>
        </nav>
      </header>
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
    </div>
  );
};

export default MyPage;
