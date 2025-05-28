import { FunctionComponent } from "react";
import { useChatStore } from "../../store/chatStore.tsx";
import { Chat } from "./Chat.tsx";
import { Box, Typography } from "@mui/material";
import { useGetChatroom } from "../../api/chatroom.ts";
import { useAuth } from "../../store/useAuth.tsx";
import { ChatSendBarContainer } from "../ChatSendBar/ChatSendBarContainer.tsx";
import { MessagesList } from "../MessagesList/MessagesList.tsx";

export const ChatContainer: FunctionComponent = () => {
  const { currentChatRoom } = useChatStore();
  const { data: chatRoom = null } = useGetChatroom(currentChatRoom?.id, 5000);
  const { user } = useAuth();

  const recipient =
    currentChatRoom?.users.filter((u) => u.id !== user?.id) || [];

  return chatRoom ? (
    <Chat
      messages={chatRoom.messages}
      recipient={recipient}
      MessagesList={<MessagesList messages={chatRoom.messages} />}
      SendComponent={<ChatSendBarContainer />}
    />
  ) : (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        flexGrow: 1,
      }}
    >
      <Typography variant="h4">Select your chat</Typography>
    </Box>
  );
};
