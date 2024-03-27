import { Box } from "@mui/material";
import { Page } from "../models/page.ts";
import { ChatSelection } from "../components/Chat/ChatSelection.tsx";
import { SidebarContainer } from "../components/Sidebar/SidebarContainer.tsx";

export const ChatPage: Page = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
      }}
    >
      <SidebarContainer />

      <ChatSelection />
    </Box>
  );
};

ChatPage.path = "/chat";
