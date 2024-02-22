import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import { Sidebar } from "../components/Sidebar/Sidebar.tsx";
import { ChatContainer } from "../components/Chat/ChatContainer.tsx";

export const Chatroom: FunctionComponent = () => {
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
