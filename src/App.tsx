import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Register } from "./pages/Register.tsx";
import { Chatroom } from "./pages/Chatroom.tsx";
import { ChatStoreProvider } from "./store/chatStore.tsx";
import { FunctionComponent, useEffect, useState } from "react";
import { UserStoreProvider, useUserStore } from "./store/userStore.tsx";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

/*
    Main route is a wrapper to have a global check if the user is logged in or not
    The Outlet component is used to render child routes
 */
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

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainRoute />,
    children: [
      {
        path: Register.path,
        action: Register.action,

        element: <Register />,
      },
      { path: Chatroom.path, element: <Chatroom />, loader: Chatroom.loader },
    ],
  },
]);

export function App() {
  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <UserStoreProvider>
        <ChatStoreProvider>
          <RouterProvider router={browserRouter} />
        </ChatStoreProvider>
      </UserStoreProvider>
    </ThemeProvider>
  );
}
