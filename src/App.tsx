import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { Register } from "./pages/Register.tsx";
import { Chatroom } from "./pages/Chatroom.tsx";
import { UserStoreProvider, useUserStore } from "./store/userStore.tsx";
import { ChatStoreProvider } from "./store/chatStore.tsx";
import { FunctionComponent, useEffect, useState } from "react";
import { postRefresh } from "./api/user.ts";

const MainRoute: FunctionComponent = () => {
  const [loggedInUser, setLoggedInUser] = useUserStore();
  const [userVerified, setUserVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      if (loggedInUser) {
        const [user] = await postRefresh(loggedInUser?.id);

        if (!user) {
          setLoggedInUser(null);
          navigate("/register");
        } else {
          navigate("/chat");
        }
      } else {
        navigate("/register");
      }

      setUserVerified(true);
    };

    if (!userVerified) {
      loadUser();
    }
  }, []);

  return userVerified ? <Outlet /> : null;
};

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainRoute />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      { path: "chat", element: <Chatroom /> },
    ],
  },
]);

function App() {
  return (
    <UserStoreProvider>
      <ChatStoreProvider>
        <RouterProvider router={browserRouter} />
      </ChatStoreProvider>
    </UserStoreProvider>
  );
}

export default App;
