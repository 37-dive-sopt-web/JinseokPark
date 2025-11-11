import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/signup",
    Component: SignUpPage,
  },
]);

export default router;
