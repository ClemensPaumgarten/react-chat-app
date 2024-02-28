import { FunctionComponent } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { User } from "../../models/user.ts";
import { usePostChatroom } from "../../api/chatroom.ts";
import { useUserStore } from "../../store/userStore.tsx";
import { UserList } from "./UserList.tsx";
import { NoEntries } from "../NoEntries/NoEntries.tsx";
import { useGetUsers } from "../../api/user.ts";

export const UserListContainer: FunctionComponent = () => {
  const { user: storeUser, users } = useUserStore();
  const { isLoading } = useGetUsers();

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

      {isLoading ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {activeUsers.length > 0 ? (
            <UserList activeUsers={activeUsers} openChatroom={onOpenChatroom} />
          ) : (
            <NoEntries label="No Users" />
          )}
        </>
      )}
    </Box>
  );
};
