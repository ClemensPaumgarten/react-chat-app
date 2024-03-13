import { User } from "../models/user.ts";

export const getUserFromLocalStorage = () => {
  const user = window.localStorage.getItem("user");
  if (user) {
    return JSON.parse(user) as User;
  }
  return null;
};

export const setUserToLocalStorage = (user: User | null) => {
  if (user) {
    window.localStorage.setItem("user", JSON.stringify(user));
  } else {
    window.localStorage.removeItem("user");
  }
};
