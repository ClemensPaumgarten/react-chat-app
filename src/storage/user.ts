import { User } from "../models/user.ts";

export const getUserFromLocalStorage = () => {
  const user = window.localStorage.getItem("user");
  if (user) {
    return JSON.parse(user) as User;
  }
  return null;
};

export const setUserToLocalStorage = (user: User) => {
  window.localStorage.setItem("user", JSON.stringify(user));
};
