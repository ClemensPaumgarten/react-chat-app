import { FunctionComponent, useMemo } from "react";
import { AppBar, Box, Paper, Toolbar, Typography } from "@mui/material";
import { useAuth } from "../../store/useAuth.tsx";
import { useGetChatroom, usePostMessage } from "../../api/chatroom.ts";
import { MessagesList } from "../MessagesList/MessagesList.tsx";
import { ChatSendBarContainer } from "../ChatSendBar/ChatSendBarContainer.tsx";
import { ChatRoom } from "../../models/user.ts";

type ChatProps = {
  chatRoom: ChatRoom;
};

export const Chat: FunctionComponent<ChatProps> = ({ chatRoom }) => {
  const { data: nextChatRoom = null } = useGetChatroom(chatRoom.id, 5000);
  const { user } = useAuth();
  const { mutateAsync } = usePostMessage();
  const currentChatRoom = useMemo(() => {
    if (nextChatRoom?.id === chatRoom.id) {
      return nextChatRoom;
    }

    return chatRoom;
  }, [nextChatRoom, chatRoom]);

  const handleSendMessage = async (newMessage: string) => {
    if (!currentChatRoom || !user) return;

    try {
      await mutateAsync({
        chatRoomId: currentChatRoom.id,
        text: newMessage,
        authorId: user.id,
      });
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
