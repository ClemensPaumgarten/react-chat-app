import { FunctionComponent } from "react";
import { Box, Typography } from "@mui/material";
import { User } from "../../models/user.ts";
import { usePostChatroom } from "../../api/chatroom.ts";
import { useUserStore } from "../../store/userStore.tsx";
import { UserList } from "./UserList.tsx";
import { NoEntries } from "../NoEntries/NoEntries.tsx";

export const UserListContainer: FunctionComponent = () => {
  const { user: storeUser, users } = useUserStore();
  const { mutate } = usePostChatroom();
  const activeUsers = users.filter((user) => user.id !== storeUser?.id) || [];

  const onOpenChatroom = async (user: User) => {
    if (storeUser) {
      mutate([storeUser.id, user.id]);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{
          padding: "8px",
          backgroundColor: "#e8eaf6",
        }}
        variant="h6"
      >
        Available Users
      </Typography>

      {activeUsers.length > 0 ? (
        <UserList activeUsers={activeUsers} openChatroom={onOpenChatroom} />
      ) : (
        <NoEntries label="No Users" />
      )}
    </Box>
  );
};
