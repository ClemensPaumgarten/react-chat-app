import { Fragment, FunctionComponent } from "react";
import { UserListEntry } from "./UserListEntry.tsx";
import { User } from "../../models/user.ts";
import { Box, CircularProgress } from "@mui/material";
import { NoEntries } from "../NoEntries/NoEntries.tsx";
import { SidebarList } from "../SidebarList/SidebarList.tsx";

type UsersListProps = {
  activeUsers: User[];
  openChatroom: (user: User) => void;
  loading: boolean;
};

export const UserList: FunctionComponent<UsersListProps> = ({
  activeUsers,
  openChatroom,
  loading,
}) => {
  return (
    <Fragment>
      <SidebarList title="Available Users">
        {loading ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            {activeUsers.length > 0 ? (
              activeUsers.map((user, index) => (
                <Fragment key={index}>
                  <UserListEntry user={user} onClick={openChatroom} />
                </Fragment>
              ))
            ) : (
              <NoEntries label="No Users" />
            )}
          </>
        )}
      </SidebarList>
    </Fragment>
  );
};
