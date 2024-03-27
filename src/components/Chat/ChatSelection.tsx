import { FunctionComponent } from "react";
import { SelectChat } from "../SelectChat/SelectChat.tsx";
import { ChatContainer } from "./ChatContainer.tsx";
import { useChatSlice } from "../../slice/chatSlice.ts";

export const ChatSelection: FunctionComponent = () => {
  const { currentChatRoom } = useChatSlice();

  return currentChatRoom ? <ChatContainer /> : <SelectChat />;
};
