import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../models/user.ts";
import { useGetUsers, usePostRefresh } from "../api/user.ts";
import { BackendError } from "../models/error.ts";
import {
  getUserFromLocalStorage,
  setUserToLocalStorage,
} from "../storage/user.ts";

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
  users: User[];

  // Add more properties here
};

const initialUser = getUserFromLocalStorage();

const UserContext = createContext<UserStore>({
  user: initialUser,
  setUser: () => void 0,
  users: [],
});

export const UserStoreProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(initialUser);
  const [checkedIfUserExists, setCheckedIfUserExists] = useState(!user);
  const { data: users } = useGetUsers(5000);
  const { mutateAsync } = usePostRefresh();

  useEffect(() => {
    if (user) {
      setUserToLocalStorage(user);
    }
  }, [user]);

  useEffect(() => {
    if (!checkedIfUserExists) {
      if (user) {
        mutateAsync(user.id)
          .then((data) => {
            if (data) {
              setUser(data);
            }
          })
          .catch((e: BackendError) => {
            console.error(e.message);
            localStorage.removeItem("user");
            setUser(null);
          })
          .finally(() => {
            setCheckedIfUserExists(true);
          });
      }
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        users,
      }}
    >
      {checkedIfUserExists ? children : null}
    </UserContext.Provider>
  );
};

/**
 * Custom hook to use the user store
 */
export const useUserStore = () => {
  return useContext(UserContext);
};
