import {
  Avatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FunctionComponent } from "react";
import { User } from "../../models/user.ts";
import { deepOrange } from "@mui/material/colors";

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
      onClick={() => {
        onClick(user);
      }}
    >
      <ListItemIcon>
        <Avatar sx={{ bgcolor: deepOrange[500] }}>{user.username[0]}</Avatar>
      </ListItemIcon>
      <ListItemText>{user.username}</ListItemText>
    </ListItemButton>
  );
};
