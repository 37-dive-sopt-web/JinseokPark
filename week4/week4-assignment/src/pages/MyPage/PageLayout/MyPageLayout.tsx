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
  const { userName, setUserId } = useUserInfo();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNav = (path: string) => {
    navigate(path);
  };

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    setUserId(0);
    navigate("/");
  };

  return (
    <div className={myPageStyle}>
      <header className={headerStyle}>
        <div>
          <h2>마이페이지</h2>
          <p>안녕하세요, {userName}님</p>
        </div>
        <div>
          <button
            className={menuBtn}
            onClick={handleToggleMenu}
            aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          <nav className={`${navMenuContainer} ${isMenuOpen ? "open" : ""}`}>
            <a onClick={() => handleNav("/mypage")}>내 정보</a>
            <a onClick={() => handleNav("/mypage/members")}>회원 조회</a>
            <a onClick={handleLogout}>로그아웃</a>
            <a onClick={() => setIsModalOpen(true)}>회원 탈퇴</a>
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
