import { FunctionComponent } from "react";
import { useChatStore } from "../../store/chatStore.tsx";
import { Chat } from "./Chat.tsx";
import { Box, Typography } from "@mui/material";

export const ChatContainer: FunctionComponent = () => {
  const { currentChatRoom } = useChatStore();

  return currentChatRoom ? (
    <Chat />
  ) : (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        flexGrow: 1,
      }}
    >
      <Typography variant="h4">Select your chat</Typography>
    </Box>
  );
};
