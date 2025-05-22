import { FunctionComponent } from "react";
import { AppBar, Box, Paper, Toolbar, Typography } from "@mui/material";
import { MessagesList } from "../MessagesList/MessagesList.tsx";
import { ChatSendBarContainer } from "../ChatSendBar/ChatSendBarContainer.tsx";
import { ChatRoom } from "../../models/user.ts";

type ChatProps = {
  recipient: ChatRoom["users"];
  messages: ChatRoom["messages"];
};

export const Chat: FunctionComponent<ChatProps> = ({ recipient, messages }) => {
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
          backgroundColor: "#6a5757",
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
        <MessagesList messages={messages} />

        <ChatSendBarContainer />
      </Paper>
    </Box>
  );
};
