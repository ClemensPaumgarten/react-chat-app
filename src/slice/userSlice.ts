import { User } from "../models/user.ts";
import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../store/store.ts";

export type UserStore = {
  user: User | null;
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  } as UserStore,
  reducers: {
    setUser: (state, action) => {
      const user = action.payload;

      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));

      return state;
    },
  },
});

export const { setUser } = userSlice.actions;

export const useUserSlice = () => {
  return useAppSelector((state) => state.user);
};
