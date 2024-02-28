import { FunctionComponent, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { User } from "../../models/user.ts";
import { postChatroom } from "../../api/chatroom.ts";
import { useUserStore } from "../../store/userStore.tsx";
import { UserList } from "./UserList.tsx";
import { useChatStore } from "../../store/chatStore.tsx";
import { NoEntries } from "../NoEntries/NoEntries.tsx";
import { getUsers } from "../../api/user.ts";

export const UserListContainer: FunctionComponent = () => {
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const { user: storeUser } = useUserStore();
  const { setOpenChatRooms, openChatRooms } = useChatStore();

  const onOpenChatroom = async (user: User) => {
    if (storeUser) {
      const [chatroom] = await postChatroom([user.id, storeUser?.id]);

      if (chatroom) {
        setOpenChatRooms([chatroom, ...openChatRooms]);
      }
    }
  };

  useEffect(() => {
    getUsers().then(([users, error]) => {
      if (error) {
        console.error("Error getting users");
        return;
      }

      if (users) {
        setActiveUsers(users.filter((user) => user.id !== storeUser?.id) || []);
      }
    });
  }, []);

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
