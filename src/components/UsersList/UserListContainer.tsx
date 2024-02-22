import { FunctionComponent, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { User } from "../../models/user.ts";
import { postChatroom } from "../../api/chatroom.ts";
import { useUserStore } from "../../store/userStore.tsx";
import { UserList } from "./UserList.tsx";
import { useChatStore } from "../../store/chatStore.tsx";
import { NoEntries } from "../NoEntries/NoEntries.tsx";
import { useLoaderData } from "react-router-dom";

export const UserListContainer: FunctionComponent = () => {
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [loggedInUser] = useUserStore();
  const { setOpenChatRooms, openChatRooms } = useChatStore();
  const users = useLoaderData() as User[];

  const onOpenChatroom = async (user: User) => {
    if (loggedInUser) {
      const [chatroom] = await postChatroom([user.id, loggedInUser?.id]);

      if (chatroom) {
        setOpenChatRooms([chatroom, ...openChatRooms]);
      }
    }
  };

  useEffect(() => {
    if (users) {
      setActiveUsers(
        users.filter((user) => user.id !== loggedInUser?.id) || [],
      );
    }
  }, [users]);

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
