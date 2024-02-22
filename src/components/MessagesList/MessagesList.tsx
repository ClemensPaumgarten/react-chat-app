import { FunctionComponent } from "react";
import { ChatRoom, User } from "../../models/user.ts";
import { Box, Typography } from "@mui/material";

type MessagesListProps = {
  messages: ChatRoom["messages"];
  loggedInUser: User;
};

export const MessagesList: FunctionComponent<MessagesListProps> = ({
  messages,
  loggedInUser,
}) => {
  return (
    <Box
      sx={{
        padding: "20px",
        overflowY: "auto",
        borderColor: "divider",
        borderBottom: "1px solid",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      }}
    >
      {messages.map((message) => (
        <Box
          key={message.id}
          sx={{
            display: "flex",
            mb: 2,
            ...(message.author === loggedInUser?.id && {
              ml: "auto",
            }),

            ...(message.author !== loggedInUser?.id && {
              mr: "auto",
            }),
          }}
        >
          <Typography
            variant="body1"
            style={{
              display: "inline-block",
              padding: "8px",
              borderRadius: "8px",
              backgroundColor: "#eee",
            }}
          >
            {message.text}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
