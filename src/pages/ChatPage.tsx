import { Box } from "@mui/material";
import { Page } from "../models/page.ts";
import { getUsers } from "../api/user.ts";
import { User } from "../models/user.ts";
import { SidebarContainer } from "../components/Sidebar/SidebarContainer.tsx";
import { ChatSelection } from "../components/Chat/ChatSelection.tsx";

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

ChatPage.loader = async () => {
  let users: User[] = [];
  try {
    users = await getUsers();
  } catch (e) {
    console.error(e);
  }

  return users;
};
