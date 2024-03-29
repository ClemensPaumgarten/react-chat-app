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
import { getOpenChatrooms } from "../api/chatroom.ts";

type ChatStore = {
  openChatRooms: ChatRoom[];
  setOpenChatRooms: Dispatch<ChatRoom[]>;

  currentChatRoom: ChatRoom | null;
  setCurrentChatRoom: Dispatch<ChatRoom | null>;
};

const ChatStore = createContext<ChatStore>({
  openChatRooms: [],
  setOpenChatRooms: () => {},
  currentChatRoom: null,
  setCurrentChatRoom: () => {},
});

export const ChatStoreProvider: FunctionComponent<
  PropsWithChildren<unknown>
> = ({ children }) => {
  const [openChatRooms, setOpenChatRooms] = useState<ChatRoom[]>([]);
  const [currentChatRoom, setCurrentChatRoom] = useState<ChatRoom | null>(null);
  const { user } = useUserStore();

  const fetchOpenChatroom = async () => {
    if (user) {
      try {
        const chatRooms = await getOpenChatrooms(user.id);
        setOpenChatRooms(chatRooms);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    fetchOpenChatroom();
  }, [user]);

  return (
    <ChatStore.Provider
      value={{
        openChatRooms,
        setOpenChatRooms,
        currentChatRoom,
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
    setOpenChatRooms: chatStore.setOpenChatRooms,
    currentChatRoom: chatStore.currentChatRoom,
    setCurrentChatRoom: chatStore.setCurrentChatRoom,
  };
};
