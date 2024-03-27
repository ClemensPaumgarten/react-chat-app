import { FunctionComponent } from "react";
import { AppBar, Box, Paper, Toolbar, Typography } from "@mui/material";
import { MessagesList } from "../MessagesList/MessagesList.tsx";
import { ChatSendBarContainer } from "../ChatSendBar/ChatSendBarContainer.tsx";
import { ChatRoom, User } from "../../models/user.ts";

type ChatProps = {
  recipientName: string;
  user: User;
  currentChatRoom: ChatRoom;
  handleMessage: (newMessage: string) => void;
};

export const Chat: FunctionComponent<ChatProps> = ({
  recipientName,
  user,
  currentChatRoom,
  handleMessage,
}) => {
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
          <Typography variant="h6">Chat with {recipientName}</Typography>
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

        <ChatSendBarContainer onSend={handleMessage} />
      </Paper>
    </Box>
  );
};
