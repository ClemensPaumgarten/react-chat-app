import { FunctionComponent } from "react";
import { AppBar, Box, Paper, Toolbar, Typography } from "@mui/material";
import { useChatStore } from "../../store/chatStore.tsx";
import { useUserStore } from "../../store/userStore.tsx";
import { usePostMessage } from "../../api/chatroom.ts";
import { MessagesList } from "../MessagesList/MessagesList.tsx";
import { ChatSendBarContainer } from "../ChatSendBar/ChatSendBarContainer.tsx";

export const Chat: FunctionComponent = () => {
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
    currentChatRoom?.users.filter((user) => user.id !== user?.id) || [];

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
          backgroundColor: "primary.dark",
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
