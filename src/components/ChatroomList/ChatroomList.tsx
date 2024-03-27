import { FunctionComponent } from "react";
import { Box, List, Typography } from "@mui/material";
import { ChatroomListEntry } from "./ChatroomListEntry.tsx";
import { useGetOpenChatrooms } from "../../api/chatroom.ts";
import { useUserSlice } from "../../slice/userSlice.ts";
import { setCurrentChatRoom, useChatSlice } from "../../slice/chatSlice.ts";
import { useAppDispatch } from "../../store/store.ts";

export const ChatroomList: FunctionComponent = () => {
  const { currentChatRoom } = useChatSlice();
  const { user } = useUserSlice();
  const { data: openChatrooms = [] } = useGetOpenChatrooms(user);
  const dispatch = useAppDispatch();

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
        {openChatrooms.map((chatroom) => (
          <ChatroomListEntry
            isSelected={chatroom.id === currentChatRoom?.id}
            key={chatroom.id}
            chatRoom={chatroom}
            onChatRoomClick={(chat) => {
              dispatch(setCurrentChatRoom(chat));
            }}
          />
        ))}
      </List>
    </Box>
  );
};
