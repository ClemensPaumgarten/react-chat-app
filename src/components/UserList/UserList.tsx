import { Fragment, FunctionComponent } from "react";
import { List } from "@mui/material";
import { UserListEntry } from "./UserListEntry.tsx";
import { User } from "../../models/user.ts";

type UsersListProps = {
  activeUsers: User[];
  openChatroom: (user: User) => void;
};

export const UserList: FunctionComponent<UsersListProps> = ({
  activeUsers,
  openChatroom,
}) => {
  return (
    <List
      sx={{
        padding: 0,
      }}
    >
      {activeUsers.map((user, index) => (
        <Fragment key={index}>
          <UserListEntry user={user} onClick={openChatroom} />
        </Fragment>
      ))}
    </List>
  );
};
