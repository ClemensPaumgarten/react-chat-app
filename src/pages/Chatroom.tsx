import { Box } from "@mui/material";
import { Sidebar } from "../components/Sidebar/Sidebar.tsx";
import { ChatContainer } from "../components/Chat/ChatContainer.tsx";
import { Page } from "../models/page.ts";
import { getUsers } from "../api/user.ts";
import { User } from "../models/user.ts";

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
  let users: User[] = [];
  try {
    users = await getUsers();
  } catch (e) {
    console.error(e);
  }

  return users;
};
