import { FunctionComponent, useEffect } from "react";
import { AppBar, Box, Paper, Toolbar, Typography } from "@mui/material";
import { useChatStore } from "../../store/chatStore.tsx";
import { useUserStore } from "../../store/userStore.tsx";
import { getChatroom, postMessage } from "../../api/chatroom.ts";
import { MessagesList } from "../MessagesList/MessagesList.tsx";
import { ChatSendBarContainer } from "../ChatSendBar/ChatSendBarContainer.tsx";

export const Chat: FunctionComponent = () => {
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
  }, []);

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
