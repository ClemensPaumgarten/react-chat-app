import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Register } from "./pages/Register.tsx";
import { Chatroom } from "./pages/Chatroom.tsx";
import { ChatStoreProvider } from "./store/chatStore.tsx";
import { FunctionComponent, useEffect, useState } from "react";
import { UserStoreProvider, useUserStore } from "./store/userStore.tsx";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { postRefresh } from "./api/user.ts";
import { getUserFromLocalStorage } from "./storage/user.ts";
import { isOfTypeUser } from "./models/user.ts";

/*
    Main route is a wrapper to have a global check if the user is logged in or not
    The Outlet component is used to render child routes
 */
const MainRoute: FunctionComponent = () => {
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [locationGuarded, setLocationGuarded] = useState(false);
  const loaderData = useLoaderData();

  useEffect(() => {
    let route = location.pathname;

    if (typeof loaderData === "object" && isOfTypeUser(loaderData)) {
      // users exists in db always navigate to chat
      if (!!loaderData && location.pathname !== "/chat") {
        route = "chat";
      }
    } else {
      setUser(null);
      route = "/login";
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
    loader: async () => {
      // check if users exists in db
      const localStorageUser = getUserFromLocalStorage();

      if (!localStorageUser) {
        return null;
      }

      try {
        const user = await postRefresh(localStorageUser.id);
        if (user) {
          return user;
        }
      } catch (e) {
        console.error(e);
      }

      return null;
    },
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
