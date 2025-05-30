import { FunctionComponent } from "react";
import { Paper } from "@mui/material";
import { ChatroomList } from "../ChatroomList/ChatroomList.tsx";
import { UserListContainer } from "../UserList/UserListContainer.tsx";

export const Sidebar: FunctionComponent = () => {
  return (
    <Paper
      sx={{
        width: "450px",
        height: "calc(100vh - 64px)",
        overflowY: "scroll",
      }}
    >
      <ChatroomList />

      <UserListContainer />
    </Paper>
  );
};
