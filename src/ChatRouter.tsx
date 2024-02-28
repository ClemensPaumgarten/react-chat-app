import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { FunctionComponent, useEffect, useState } from "react";
import { useUserStore } from "./store/userStore.tsx";
import { Register } from "./pages/Register.tsx";
import { Chatroom } from "./pages/Chatroom.tsx";

const MainRoute: FunctionComponent = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [locationGuarded, setLocationGuarded] = useState(false);

  useEffect(() => {
    let route = location.pathname;

    if (!!user && location.pathname === "/login") {
      route = "chat";
    } else if (!user && location.pathname === "/chat") {
      route = "login";
    } else if (location.pathname === "/") {
      route = !!user ? "chat" : "login";
    }

    if (route !== location.pathname) {
      navigate(route);
    } else {
      setLocationGuarded(true);
    }
  }, [pathname]);

  return locationGuarded ? <Outlet /> : null;
};

export const ChatRouter = () => {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainRoute />,

      children: [
        {
          path: Register.path,

          element: <Register />,
        },
        { path: Chatroom.path, element: <Chatroom /> },
      ],
    },
  ]);

  return <RouterProvider router={browserRouter} />;
};
