import {
  myPageStyle,
  headerStyle,
  menuBtn,
  navMenuContainer,
} from "./MyPageLayout.css";
import { useUserInfo } from "../../../hooks/useUserInfo";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import DeleteIdModal from "../../Modal/DeleteIdModal";

const PageLayout = () => {
  const { userName } = useUserInfo();
  const navigate = useNavigate();
  const displayName = userName;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNav = (path: string) => {
    navigate(path);
  };

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className={myPageStyle}>
      <header className={headerStyle}>
        <div>
          <h2>마이페이지</h2>
          <p>안녕하세요, {displayName}님</p>
        </div>
        <div>
          <button className={menuBtn} onClick={handleToggleMenu}>
            <i className="fa-solid fa-bars"></i>
          </button>
          <nav className={`${navMenuContainer} ${isMenuOpen ? "open" : ""}`}>
            <p onClick={() => handleNav("/mypage")}>내 정보</p>
            <p onClick={() => handleNav("/mypage/members")}>회원 조회</p>
            <p onClick={() => handleNav("/")}>로그아웃</p>
            <p onClick={() => setIsModalOpen(true)}>회원 탈퇴</p>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      {isModalOpen && <DeleteIdModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default PageLayout;
