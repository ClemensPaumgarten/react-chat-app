import { FunctionComponent, useState, useRef, ChangeEvent } from "react";
import { ChatSendBar } from "./ChatSendBar.tsx";
import { usePostMessage } from "../../api/chatroom.ts";
import { useChatStore } from "../../store/chatStore.tsx";
import { useAuth } from "../../store/useAuth.tsx";

export const ChatSendBarContainer: FunctionComponent = () => {
  const [newMessage, setNewMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate: postMessage } = usePostMessage();
  const { currentChatRoom } = useChatStore();
  const { user } = useAuth();

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setNewMessage(value);
  };

  const setFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const onSendClick = () => {
    if (!currentChatRoom || !user) {
      return;
    }

    setNewMessage("");
    setFocus();

    postMessage({
      chatRoomId: currentChatRoom.id,
      authorId: user.id,
      text: newMessage,
    });
  };

  return (
    <ChatSendBar
      ref={inputRef}
      onSend={onSendClick}
      message={newMessage}
      onMessageChange={onInputChange}
    />
  );
};
