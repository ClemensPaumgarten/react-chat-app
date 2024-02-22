import { Box, Typography } from "@mui/material";
import { FunctionComponent } from "react";

type NoEntriesProps = {
  label: string;
};

export const NoEntries: FunctionComponent<NoEntriesProps> = ({ label }) => (
  <Box
    sx={{
      height: "64px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fafafa",
    }}
  >
    <Typography>{label}</Typography>
  </Box>
);
