import { Box } from "@mui/material";
import { Sidebar } from "../components/Sidebar/Sidebar.tsx";
import { ChatContainer } from "../components/Chat/ChatContainer.tsx";
import { Page } from "../models/page.ts";
import { getUsers } from "../api/user.ts";

export const Chatroom: Page = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
      }}
    >
      <Sidebar />
      <ChatContainer />
    </Box>
  );
};

Chatroom.path = "chat";

Chatroom.loader = async () => {
  const [users] = await getUsers();

  return users || [];
};
