import { useRef } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { Page } from "../models/page.ts";
import { postRegister } from "../api/user.ts";
import { useUserStore } from "../store/userStore.tsx";
import { useNavigate } from "react-router-dom";

export const Register: Page = () => {
  const inputElement = useRef<HTMLInputElement>(null);
  const { setUser } = useUserStore();
  const navigate = useNavigate();

  const onClick = () => {
    if (inputElement.current) {
      const value = inputElement.current.value;

      if (value) {
        postRegister({ username: value }).then((user) => {
          if (user) {
            setUser(user);

            navigate("/chat");
          }
        });
      }
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        sx={{
          display: "flex",
          alignItems: "center",
        }}
        spacing={3}
      >
        <Typography variant="h4" gutterBottom>
          Chatroom Login
        </Typography>

        <TextField label="Username" inputRef={inputElement} fullWidth />

        <Button variant="contained" color="secondary" onClick={onClick}>
          Anmelden
        </Button>
      </Stack>
    </Box>
  );
};

Register.path = "login";

Register.action = async ({ request }) => {
  let formData = await request.formData();
  const username = formData.get("username");

  // TODO: add react router actions

  return username;
};
