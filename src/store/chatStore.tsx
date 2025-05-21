import { create } from "zustand";
import { ChatRoom } from "../models/user";

type ChatState = {
  openChatRooms: ChatRoom[];
  currentChatRoom: ChatRoom | null;

  setCurrentChatRoom: (chatroom: ChatRoom | null) => void;
  setOpenChatRooms: (rooms: ChatRoom[]) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  openChatRooms: [],
  currentChatRoom: null,

  setCurrentChatRoom: (chatroom) => set({ currentChatRoom: chatroom }),
  setOpenChatRooms: (rooms) => set({ openChatRooms: rooms }),
}));
