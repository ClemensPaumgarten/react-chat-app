import { FunctionComponent } from "react";
import { Box, Typography } from "@mui/material";

export const SelectChat: FunctionComponent = () => {
  return (
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
