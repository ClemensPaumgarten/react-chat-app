import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../models/user";

type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),
    }),
    {
      name: "auth-storage", // key in localStorage
      partialize: (state) => ({ user: state.user }), // only persist user
    },
  ),
);
