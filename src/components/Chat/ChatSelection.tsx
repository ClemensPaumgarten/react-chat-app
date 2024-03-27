import { FunctionComponent } from "react";
import { useChatStore } from "../../store/chatStore.tsx";
import { SelectChat } from "../SelectChat/SelectChat.tsx";

export const ChatContainer: FunctionComponent = () => {
  const { currentChatRoom } = useChatStore();

  return currentChatRoom ? <ChatContainer /> : <SelectChat />;
};
