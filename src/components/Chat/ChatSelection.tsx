import { FunctionComponent } from "react";
import { useChatStore } from "../../store/chatStore.tsx";
import { Chat } from "./Chat.tsx";
import { SelectChat } from "../SelectChat/SelectChat.tsx";

export const ChatContainer: FunctionComponent = () => {
  const { currentChatRoom } = useChatStore();

  return currentChatRoom ? <Chat /> : <SelectChat />;
};
