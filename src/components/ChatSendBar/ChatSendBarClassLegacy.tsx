import { Component, createRef, RefObject } from "react";
import { ChatSendBar } from "./ChatSendBar";
import { useChatStore } from "../../store/chatStore.tsx";
import { useAuth } from "../../store/useAuth.tsx";

type ChatSendBarState = {
  newMessage: string;
};

type ChatSendBarProps = {};

export class ChatSendBarContainerClassLegacy extends Component<
  ChatSendBarProps,
  ChatSendBarState
> {
  private inputRef: RefObject<HTMLInputElement>;

  constructor(props: ChatSendBarProps) {
    super(props);
    this.state = {
      newMessage: "",
    };

    this.inputRef = createRef();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSendClick = this.handleSendClick.bind(this);
  }

  handleInputChange = (e) => {
    this.setState({ newMessage: e.target.value });
  };

  handleSendClick = () => {
    const chatRoomId = useChatStore.getState().currentChatRoom?.id;
    const authorId = useAuth.getState().user?.id;
    const { newMessage } = this.state;

    if (!chatRoomId || !authorId || !newMessage.trim()) return;

    try {
      console.log("Sending message", newMessage);

      this.setState({ newMessage: "" });

      // Refocus the input after sending
      if (this.inputRef.current) {
        this.inputRef.current.focus();
      }
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  render() {
    return (
      <ChatSendBar
        ref={this.inputRef}
        message={this.state.newMessage}
        onMessageChange={this.handleInputChange}
        onSendClick={() => void 0}
      />
    );
  }
}

export default ChatSendBarContainerClassLegacy;
