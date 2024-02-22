import { FunctionComponent } from "react";
import { Box, List, Typography } from "@mui/material";
import { ChatroomListEntry } from "./ChatroomListEntry.tsx";
import { useChatStore } from "../../store/chatStore.tsx";

export const ChatroomList: FunctionComponent = () => {
  const { openChatRooms, setCurrentChatRoom, currentChatRoom } = useChatStore();

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

      <List>
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
