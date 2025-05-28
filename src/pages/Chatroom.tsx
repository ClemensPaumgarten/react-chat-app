import { Box } from "@mui/material";
import { Sidebar } from "../components/Sidebar/Sidebar.tsx";
import { ChatContainer } from "../components/Chat/ChatContainer.tsx";
import { Page } from "../models/page.ts";

export const Chatroom: Page = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "calc(100vh - 64px)",
        display: "flex",
      }}
    >
      <Sidebar />

      <ChatContainer />
    </Box>
  );
};

Chatroom.path = "chat";
