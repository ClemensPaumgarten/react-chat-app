import { FunctionComponent } from "react";
import { ChatRoom } from "../../models/user.ts";
import {
  Avatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useUserStore } from "../../store/userStore.tsx";
import { deepOrange } from "@mui/material/colors";

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
  const [loggedInUser] = useUserStore();

  const users = chatRoom.users.filter((user) => user.id !== loggedInUser?.id);

  return (
    <ListItemButton
      selected={isSelected}
      onClick={() => {
        onChatRoomClick(chatRoom);
      }}
    >
      <ListItemIcon>
        <Avatar sx={{ bgcolor: deepOrange[500] }}>
          {users[0]?.username[0]}
        </Avatar>
      </ListItemIcon>
      <ListItemText>{users.map((u) => u.username).join(", ")}</ListItemText>
    </ListItemButton>
  );
};
