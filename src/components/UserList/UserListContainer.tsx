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
      try {
        const chatroom = await postChatroom([user.id, storeUser?.id]);

        const inExisting = openChatRooms.find(
          (room) => room.id === chatroom?.id,
        );

        if (chatroom && !inExisting) {
          setOpenChatRooms([chatroom, ...openChatRooms]);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        if (users) {
          setActiveUsers(
            users.filter((user) => user.id !== storeUser?.id) || [],
          );
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchUsers();
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
