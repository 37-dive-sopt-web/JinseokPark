import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import MyPageLayout from "../pages/MyPage/PageLayout/MyPageLayout";
import MyPage from "../pages/MyPage/MyInfo/MyPage";
import MemberInfo from "../pages/MyPage/MemberInfo/MemberInfo";

const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/signup",
    Component: SignUpPage,
  },
  {
    path: "/mypage",
    Component: MyPageLayout,
    children: [
      {
        index: true,
        Component: MyPage,
      },
      {
        path: "members",
        Component: MemberInfo,
      },
    ],
  },
]);

export default router;
