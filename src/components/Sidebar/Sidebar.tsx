import { FunctionComponent } from "react";
import { Paper } from "@mui/material";
import { ChatroomList } from "../ChatroomList/ChatroomList.tsx";
import { UserListContainer } from "../UserList/UserListContainer.tsx";
import { User } from "../../models/user.ts";
import { HeaderBar } from "../Headerbar/Headerbar.tsx";

type SidebarProps = {
  user: User;
};

export const Sidebar: FunctionComponent<SidebarProps> = ({ user }) => {
  return (
    <Paper
      sx={{
        width: "450px",
        height: "100vh",
        overflowY: "scroll",
        borderRadius: "0",
      }}
    >
      <HeaderBar username={user.username} />
      <ChatroomList />
      <UserListContainer />
    </Paper>
  );
};
