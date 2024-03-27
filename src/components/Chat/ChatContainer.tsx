import { Chat } from "./Chat.tsx";
import { useGetChatroom, usePostMessage } from "../../api/chatroom.ts";
import { useUserSlice } from "../../slice/userSlice.ts";
import { setCurrentChatRoom, useChatSlice } from "../../slice/chatSlice.ts";
import { useAppDispatch } from "../../store/store.ts";
import { useEffect } from "react";

export const ChatContainer = () => {
  const { currentChatRoom } = useChatSlice();
  const dispatch = useAppDispatch();
  const { user } = useUserSlice();
  const { mutateAsync } = usePostMessage();
  const { data: backendChatroom } = useGetChatroom(
    currentChatRoom?.id || null,
    2000,
  );

  const handleSendMessage = async (newMessage: string) => {
    if (!currentChatRoom || !user) return;

    dispatch(
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
      }),
    );

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

  useEffect(() => {
    if (backendChatroom) {
      dispatch(setCurrentChatRoom(backendChatroom));
    }
  }, [backendChatroom]);

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
