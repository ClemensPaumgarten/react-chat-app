import { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore.tsx";
import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { isOfTypeUser, User } from "../models/user.ts";
import { Page } from "../models/page.ts";
import { getUserFromLocalStorage } from "../storage/user.ts";
import { postRefresh } from "../api/user.ts";
import { ChatPage } from "./ChatPage.tsx";
import { Register } from "./Register.tsx";

export const MainRoute: Page = () => {
  const { setUser, user: storeUser } = useUserStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [locationGuarded, setLocationGuarded] = useState(false);
  const loaderData = useLoaderData();

  useEffect(() => {
    let route = location.pathname;

    const userData = (loaderData || storeUser) as User | null;
    if (isOfTypeUser(userData)) {
      // users exists in db always navigate to chat
      if (!!userData && location.pathname !== ChatPage.path) {
        route = ChatPage.path;
      }
    } else {
      setUser(null);
      route = Register.path;
    }

    if (route !== location.pathname) {
      navigate(route);
    } else {
      setLocationGuarded(true);
    }
  }, [pathname]);

  return locationGuarded ? <Outlet /> : null;
};

MainRoute.path = "/";

MainRoute.loader = async () => {
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
    console.info("Initial load", e);
  }

  return null;
};
