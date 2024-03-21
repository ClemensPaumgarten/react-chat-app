import { Box, Typography } from "@mui/material";
import { FunctionComponent } from "react";

type HeaderBarProps = {
  username: string;
};

export const HeaderBar: FunctionComponent<HeaderBarProps> = ({ username }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "primary.dark",
        height: 64,
        paddingLeft: "16px",
      }}
    >
      <Typography
        sx={{
          color: "#fff",
        }}
        variant="h6"
      >
        {username}
      </Typography>
    </Box>
  );
};
