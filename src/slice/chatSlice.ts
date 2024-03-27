import { ChatRoom } from "../models/user.ts";
import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../store/store.ts";

export type ChatStore = {
  currentChatRoom: ChatRoom | null;
};

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    currentChatRoom: null,
  } as ChatStore,
  reducers: {
    setCurrentChatRoom: (state, action) => {
      state.currentChatRoom = action.payload;

      return state;
    },
  },
});

export const { setCurrentChatRoom } = chatSlice.actions;

export const useChatSlice = () => {
  return useAppSelector((state) => state.chat);
};
