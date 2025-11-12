import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
import { UserProvider } from "./context/UserProvider";

const App = () => {
  return (
    <UserProvider>
      <RouterProvider router={router} />;
    </UserProvider>
  );
};

export default App;
