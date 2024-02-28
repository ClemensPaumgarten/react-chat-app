import { Box } from "@mui/material";
import { Page } from "../models/page.ts";
import { ChatContainer } from "../components/Chat/ChatSelection.tsx";
import { SidebarContainer } from "../components/Sidebar/SidebarContainer.tsx";

export const Chatroom: Page = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
      }}
    >
      <SidebarContainer />

      <ChatContainer />
    </Box>
  );
};

Chatroom.path = "chat";
