import { FunctionComponent, useEffect } from "react";
import { AppBar, Box, Paper, Toolbar, Typography } from "@mui/material";
import { useGetChatroom, usePostMessage } from "../../api/chatroom.ts";
import { MessagesList } from "../MessagesList/MessagesList.tsx";
import { ChatSendBarContainer } from "../ChatSendBar/ChatSendBarContainer.tsx";
import { useUserSlice } from "../../slice/userSlice.ts";
import { setCurrentChatRoom, useChatSlice } from "../../slice/chatSlice.ts";
import { useAppDispatch } from "../../store/store.ts";

export const Chat: FunctionComponent = () => {
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

  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        flexDirection: "column",
        flexGrow: "1",
        height: "100vh",
      }}
    >
      <AppBar
        sx={{
          backgroundColor: "#fff",
          color: "#000",
          borderBottom: "1px solid",
          borderColor: "divider",
          maxHeight: 64,
        }}
        elevation={2}
        position="static"
      >
        <Toolbar>
          <Typography variant="h6">
            Chat with {recipient.map((r) => r.username)}
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
        elevation={1}
      >
        {user && (
          <MessagesList
            messages={currentChatRoom?.messages || []}
            loggedInUser={user}
          />
        )}

        <ChatSendBarContainer onSend={handleSendMessage} />
      </Paper>
    </Box>
  );
};
