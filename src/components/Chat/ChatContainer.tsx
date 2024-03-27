import { FunctionComponent, useEffect } from "react";
import { setCurrentChatRoom, useChatSlice } from "../../slice/chatSlice.ts";
import { useUserSlice } from "../../slice/userSlice.ts";
import { useGetChatroom, usePostMessage } from "../../api/chatroom.ts";
import { useAppDispatch } from "../../store/store.ts";
import { Chat } from "./Chat.tsx";

export const ChatContainer: FunctionComponent = () => {
  const { currentChatRoom } = useChatSlice();
  const { user } = useUserSlice();
  const { mutateAsync } = usePostMessage();
  const dispatch = useAppDispatch();
  const { data: chatRoomSync } = useGetChatroom(
    currentChatRoom?.id || null,
    5000,
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

      dispatch(setCurrentChatRoom(chatRoom));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (chatRoomSync) {
      dispatch(setCurrentChatRoom(chatRoomSync));
    }
  }, [chatRoomSync, dispatch]);

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
