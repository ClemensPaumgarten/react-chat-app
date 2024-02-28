import {
  Avatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FunctionComponent } from "react";
import { User } from "../../models/user.ts";
import { grey } from "@mui/material/colors";

type UserEntryProps = {
  user: User;
  onClick: (user: User) => void;
};

export const UserListEntry: FunctionComponent<UserEntryProps> = ({
  user,
  onClick,
}) => {
  return (
    <ListItemButton
      sx={{
        borderBottom: `1px solid ${grey[300]}`,
      }}
      onClick={() => {
        onClick(user);
      }}
    >
      <ListItemIcon>
        <Avatar sx={{ bgcolor: grey[400] }}>{user.username[0]}</Avatar>
      </ListItemIcon>
      <ListItemText>{user.username}</ListItemText>
    </ListItemButton>
  );
};
