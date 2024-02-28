import { ChatRoom } from "../models/user.ts";
import {
  createContext,
  Dispatch,
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useUserStore } from "./userStore.tsx";
import { useGetChatroom, useGetOpenChatrooms } from "../api/chatroom.ts";

type ChatStore = {
  openChatRooms: ChatRoom[];

  currentChatRoom: ChatRoom | null;
  setCurrentChatRoom: Dispatch<ChatRoom | null>;
};

const ChatStore = createContext<ChatStore>({
  openChatRooms: [],
  currentChatRoom: null,
  setCurrentChatRoom: () => {},
});

export const ChatStoreProvider: FunctionComponent<
  PropsWithChildren<unknown>
> = ({ children }) => {
  const [currentChatRoom, setCurrentChatRoom] = useState<ChatRoom | null>(null);
  const { user } = useUserStore();
  const { data: openChatrooms } = useGetOpenChatrooms(user);
  const { data: chatroom } = useGetChatroom(currentChatRoom?.id || null, 2000);

  useEffect(() => {
    if (chatroom) {
      setCurrentChatRoom(chatroom);
    }
  }, [chatroom]);

  return (
    <ChatStore.Provider
      value={{
        openChatRooms: openChatrooms || [],
        currentChatRoom: currentChatRoom,
        setCurrentChatRoom,
      }}
    >
      {children}
    </ChatStore.Provider>
  );
};

export const useChatStore = () => {
  const chatStore = useContext(ChatStore);
  if (!chatStore) {
    throw new Error("useChatStore must be used within a ChatStoreProvider");
  }

  return {
    openChatRooms: chatStore.openChatRooms,
    currentChatRoom: chatStore.currentChatRoom,
    setCurrentChatRoom: chatStore.setCurrentChatRoom,
  };
};
