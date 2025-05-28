import { FunctionComponent } from "react";
import { AppBar, Box, Paper, Toolbar, Typography } from "@mui/material";
import { ChatRoom } from "../../models/user.ts";

type ChatProps = {
  recipient: ChatRoom["users"];
  messages: ChatRoom["messages"];
  SendComponent: React.ReactNode;
  MessagesList: React.ReactNode;
};

export const Chat: FunctionComponent<ChatProps> = ({
  recipient,
  SendComponent,
  MessagesList,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        flexDirection: "column",
        flexGrow: "1",
        height: "calc(100vh - 64px)",
      }}
    >
      <AppBar
        elevation={2}
        position="static"
        color="inherit"
        sx={{
          borderBottom: "1px solid #e0e0e0",
        }}
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
        {MessagesList}

        {SendComponent}
      </Paper>
    </Box>
  );
};
