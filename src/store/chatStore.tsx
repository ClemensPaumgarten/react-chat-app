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
import { useGetChatroom } from "../api/chatroom.ts";

type ChatStore = {
  currentChatRoom: ChatRoom | null;
  setCurrentChatRoom: Dispatch<ChatRoom | null>;
};

const ChatStore = createContext<ChatStore>({
  currentChatRoom: null,
  setCurrentChatRoom: () => {},
});

export const ChatStoreProvider: FunctionComponent<
  PropsWithChildren<unknown>
> = ({ children }) => {
  const [currentChatRoom, setCurrentChatRoom] = useState<ChatRoom | null>(null);
  const { data: chatroom } = useGetChatroom(currentChatRoom?.id || null, 2000);

  useEffect(() => {
    if (chatroom) {
      setCurrentChatRoom(chatroom);
    }
  }, [chatroom]);

  return (
    <ChatStore.Provider
      value={{
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
    currentChatRoom: chatStore.currentChatRoom,
    setCurrentChatRoom: chatStore.setCurrentChatRoom,
  };
};
