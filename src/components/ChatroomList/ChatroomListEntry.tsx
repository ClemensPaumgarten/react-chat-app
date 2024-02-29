import { FunctionComponent } from "react";
import { ChatRoom } from "../../models/user.ts";
import {
  Avatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { teal, grey } from "@mui/material/colors";
import { useUserSlice } from "../../slice/userSlice.ts";

type ChatRoomEntryProps = {
  chatRoom: ChatRoom;
  onChatRoomClick: (chat: ChatRoom) => void;
  isSelected: boolean;
};

export const ChatroomListEntry: FunctionComponent<ChatRoomEntryProps> = ({
  chatRoom,
  onChatRoomClick,
  isSelected,
}) => {
  const { user } = useUserSlice();
  const users = chatRoom.users.filter((u) => u.id !== user?.id);

  return (
    <ListItemButton
      selected={isSelected}
      sx={{
        borderBottom: `1px solid ${grey[300]}`,
      }}
      onClick={() => {
        onChatRoomClick(chatRoom);
      }}
    >
      <ListItemIcon>
        <Avatar sx={{ bgcolor: teal[600] }}>{users[0]?.username[0]}</Avatar>
      </ListItemIcon>
      <ListItemText>{users.map((u) => u.username).join(", ")}</ListItemText>
    </ListItemButton>
  );
};
