import { FunctionComponent } from "react";
import { SelectChat } from "../SelectChat/SelectChat.tsx";
import { useChatSlice } from "../../slice/chatSlice.ts";
import { ChatContainer } from "./ChatContainer.tsx";

export const ChatSelection: FunctionComponent = () => {
  const { currentChatRoom } = useChatSlice();

  return currentChatRoom ? <ChatContainer /> : <SelectChat />;
};
