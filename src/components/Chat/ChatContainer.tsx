import { useChatStore } from "../../store/chatStore.tsx";
import { useUserStore } from "../../store/userStore.tsx";
import { Chat } from "./Chat.tsx";
import { usePostMessage } from "../../api/chatroom.ts";

export const ChatContainer = () => {
  const { currentChatRoom, setCurrentChatRoom } = useChatStore();
  const { user } = useUserStore();
  const { mutateAsync } = usePostMessage();

  const handleSendMessage = async (newMessage: string) => {
    if (!currentChatRoom || !user) return;

    setCurrentChatRoom({
      ...currentChatRoom,
      messages: [
        ...currentChatRoom.messages,
        {
          author: user.id,
          id: "temp-id",
          text: newMessage,
        },
      ],
    });

    try {
      const chatRoom = await mutateAsync({
        chatRoomId: currentChatRoom.id,
        text: newMessage,
        authorId: user.id,
      });

      setCurrentChatRoom(chatRoom);
    } catch (e) {
      console.error(e);
    }
  };

  const recipient =
    currentChatRoom?.users.filter((u) => u.id !== user?.id) || [];

  if (!currentChatRoom || !user) {
    return null;
  }

  return (
    <Chat
      recipientName={recipient[0]?.username || "Unknown"}
      user={user}
      currentChatRoom={currentChatRoom}
      handleMessage={handleSendMessage}
    />
  );
};
