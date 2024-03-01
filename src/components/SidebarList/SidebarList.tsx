import { Box, List, Typography } from "@mui/material";
import { FunctionComponent, PropsWithChildren } from "react";

type SidebarListProps = {
  title: string;
};

export const SidebarList: FunctionComponent<
  PropsWithChildren<SidebarListProps>
> = ({ title, children }) => {
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
        {title}
      </Typography>

      <List
        sx={{
          padding: 0,
        }}
      >
        {children}
      </List>
    </Box>
  );
};
