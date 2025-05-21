import { FunctionComponent } from "react";
import { Box, List, Typography } from "@mui/material";
import { ChatroomListEntry } from "./ChatroomListEntry.tsx";
import { useChatStore } from "../../store/chatStore.tsx";
import { useGetOpenChatrooms } from "../../api/chatroom.ts";
import { useAuth } from "../../store/useAuth.tsx";

export const ChatroomList: FunctionComponent = () => {
  const { setCurrentChatRoom, currentChatRoom } = useChatStore();
  const { user } = useAuth();
  const { data: openChatRooms = [] } = useGetOpenChatrooms(user);

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
        Open Chats
      </Typography>

      <List
        sx={{
          padding: 0,
        }}
      >
        {openChatRooms.map((chatroom) => (
          <ChatroomListEntry
            isSelected={chatroom.id === currentChatRoom?.id}
            key={chatroom.id}
            chatRoom={chatroom}
            onChatRoomClick={(chat) => {
              setCurrentChatRoom(chat);
            }}
          />
        ))}
      </List>
    </Box>
  );
};
