import { FunctionComponent } from "react";
import { useChatStore } from "../../store/chatStore.tsx";
import { SelectChat } from "../SelectChat/SelectChat.tsx";
import { ChatContainer } from "./ChatContainer.tsx";

export const ChatSelection: FunctionComponent = () => {
  const { currentChatRoom } = useChatStore();

  return currentChatRoom ? <ChatContainer /> : <SelectChat />;
};
