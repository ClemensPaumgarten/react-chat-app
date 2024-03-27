import { FunctionComponent } from "react";
import { Chat } from "./Chat.tsx";
import { SelectChat } from "../SelectChat/SelectChat.tsx";
import { useChatSlice } from "../../slice/chatSlice.ts";

export const ChatContainer: FunctionComponent = () => {
  const { currentChatRoom } = useChatSlice();

  return currentChatRoom ? <Chat /> : <SelectChat />;
};
