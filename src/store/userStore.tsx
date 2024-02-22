import { User } from "../models/user.ts";
import React, {
  Dispatch,
  FunctionComponent,
  PropsWithChildren,
  useState,
} from "react";

type UserStore = {
  loggedInUser: User | null;
  setLoggedInUser: Dispatch<User | null>;
};

const localStorageUserData = localStorage.getItem("user");
const localStorageUser: User = localStorageUserData
  ? JSON.parse(localStorageUserData)
  : null;

const UserStore = React.createContext<UserStore>({
  loggedInUser: localStorageUser,
  setLoggedInUser: () => {},
});

export const UserStoreProvider: FunctionComponent<
  PropsWithChildren<unknown>
> = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(
    localStorageUser,
  );

  return (
    <UserStore.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </UserStore.Provider>
  );
};

export const useUserStore = () => {
  const context = React.useContext(UserStore);

  if (!context) {
    throw new Error("useUserStore must be used within a UserStoreProvider");
  }

  return [context.loggedInUser, context.setLoggedInUser] as const;
};
