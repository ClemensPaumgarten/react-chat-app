import { FunctionComponent, useState, useRef, ChangeEvent } from "react";
import { ChatSendBar } from "./ChatSendBar.tsx";

type ChatSendBarContainerProps = {
  onSend: (newMessage: string) => void;
};

export const ChatSendBarContainer: FunctionComponent<
  ChatSendBarContainerProps
> = ({ onSend }) => {
  const [newMessage, setNewMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

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
    onSend(newMessage);
    setNewMessage("");
    setFocus();
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
