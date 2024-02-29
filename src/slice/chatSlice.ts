import { ChatRoom } from "../models/user.ts";
import { createSlice } from "@reduxjs/toolkit";

export type ChatStore = {
  openChatRooms: ChatRoom[];

  currentChatRoom: ChatRoom | null;
};

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    openChatRooms: [],
    currentChatRoom: null,
  } as ChatStore,
  reducers: {
    setOpenChatRooms: (state, action) => {
      state.openChatRooms = action.payload;

      return state;
    },
    setCurrentChatRoom: (state, action) => {
      state.currentChatRoom = action.payload;

      return state;
    },
  },
});

export const { setOpenChatRooms, setCurrentChatRoom } = chatSlice.actions;
