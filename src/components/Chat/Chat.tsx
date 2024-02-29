import { FunctionComponent } from "react";
import { AppBar, Box, Paper, Toolbar, Typography } from "@mui/material";
import { useChatStore } from "../../store/chatStore.tsx";
import { usePostMessage } from "../../api/chatroom.ts";
import { MessagesList } from "../MessagesList/MessagesList.tsx";
import { ChatSendBarContainer } from "../ChatSendBar/ChatSendBarContainer.tsx";
import { useUserSlice } from "../../slice/userSlice.ts";

export const Chat: FunctionComponent = () => {
  const { currentChatRoom, setCurrentChatRoom } = useChatStore();
  const { user } = useUserSlice();
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
