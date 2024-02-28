import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../models/user.ts";

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;

  // Add more properties here
};

const localUser = localStorage.getItem("user");
const initialUser = localUser ? (JSON.parse(localUser) as User) : null;

const UserContext = createContext<UserStore>({
  user: initialUser,
  setUser: () => void 0,
});

export const UserStoreProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(initialUser);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

/**
 * Custom hook to use the user store
 */
export const useUserStore = () => {
  return useContext(UserContext);
};
