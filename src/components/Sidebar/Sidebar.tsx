import { FunctionComponent } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useUserStore } from "../../store/userStore.tsx";
import { ChatroomList } from "../ChatroomList/ChatroomList.tsx";
import { UserListContainer } from "../UsersList/UserListContainer.tsx";

export const Sidebar: FunctionComponent = () => {
  const [loggedInUser] = useUserStore();
  return (
    <Paper
      sx={{
        width: "450px",
        height: "100%",
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
          {loggedInUser?.username}
        </Typography>
      </Box>

      <UserListContainer />

      <ChatroomList />
    </Paper>
  );
};
