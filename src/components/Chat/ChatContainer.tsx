import { useChatStore } from "../../store/chatStore.tsx";
import { useUserStore } from "../../store/userStore.tsx";
import { getChatroom, postMessage } from "../../api/chatroom.ts";
import { useEffect } from "react";
import { Chat } from "./Chat.tsx";

export const ChatContainer = () => {
  const { currentChatRoom, setCurrentChatRoom } = useChatStore();
  const { user } = useUserStore();

  const handleSendMessage = async (newMessage: string) => {
    if (!currentChatRoom || !user) return;

    try {
      const chatRoom = await postMessage({
        chatRoomId: currentChatRoom.id,
        text: newMessage,
        authorId: user.id,
      });

      if (chatRoom) {
        setCurrentChatRoom(chatRoom);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    const polling = async () => {
      if (!currentChatRoom) return;

      try {
        const chatRoom = await getChatroom(currentChatRoom.id);

        if (chatRoom) {
          setCurrentChatRoom(chatRoom);
        }
      } catch (e) {
        console.error(e);
      }
    };

    if (currentChatRoom) {
      intervalId = setInterval(polling, 3000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [currentChatRoom]);

  const recipient =
    currentChatRoom?.users.filter((u) => u.id !== user?.id) || [];

  if (!user || !currentChatRoom) return null;

  return (
    <Chat
      recipientName={recipient[0]?.username || "Unknown"}
      user={user}
      currentChatRoom={currentChatRoom}
      handleMessage={handleSendMessage}
    />
  );
};
