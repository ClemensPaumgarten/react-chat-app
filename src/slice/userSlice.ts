import { User } from "../models/user.ts";
import { createSlice } from "@reduxjs/toolkit";

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
      state.user = action.payload;

      return state;
    },
  },
});

export const { setUser } = userSlice.actions;
