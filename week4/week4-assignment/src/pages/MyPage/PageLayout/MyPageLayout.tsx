import { myPageStyle, headerStyle } from "./MyPageLayout.css";
import { useUserInfo } from "../../../hooks/useUserInfo";
import { Outlet, useNavigate } from "react-router-dom";

const PageLayout = () => {
  const { userName } = useUserInfo();
  const navigate = useNavigate();
  const displayName = userName;

  const handleNav = (path: string) => {
    navigate(path);
  };

  return (
    <div className={myPageStyle}>
      <header className={headerStyle}>
        <div>
          <h2>마이페이지</h2>
          <p>안녕하세요, {displayName}님</p>
        </div>
        <nav>
          <p onClick={() => handleNav("/mypage")}>내 정보</p>
          <p onClick={() => handleNav("/mypage/members")}>회원 조회</p>
          <p onClick={() => handleNav("/")}>로그아웃</p>
          <p onClick={() => handleNav("/mypage")}>회원 탈퇴</p>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PageLayout;
