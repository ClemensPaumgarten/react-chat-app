import { FunctionComponent } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { ChatroomList } from "../ChatroomList/ChatroomList.tsx";
import { UserListContainer } from "../UserList/UserListContainer.tsx";
import { useUserStore } from "../../store/userStore.tsx";

export const Sidebar: FunctionComponent = () => {
  const { user } = useUserStore();
  return (
    <Paper
      sx={{
        width: "450px",
        height: "100vh",
        overflowY: "scroll",
        borderRadius: "0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "primary.dark",
          height: 64,
          paddingLeft: "16px",
        }}
      >
        <Typography
          sx={{
            color: "#fff",
          }}
          variant="h6"
        >
          {user?.username}
        </Typography>
      </Box>

      <ChatroomList />

      <UserListContainer />
    </Paper>
  );
};
