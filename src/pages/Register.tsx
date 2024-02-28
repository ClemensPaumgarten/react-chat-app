import { useRef } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { Page } from "../models/page.ts";
import { postRegister } from "../api/user.ts";
import { useUserStore } from "../store/userStore.tsx";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

export const Register: Page = () => {
  const inputElement = useRef<HTMLInputElement>(null);
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: postRegister,
    onSuccess: (data) => {
      if (data) {
        setUser(data);
        navigate("/chat");
        localStorage.setItem("user", JSON.stringify(data));
      }
    },
  });

  const onClick = () => {
    if (inputElement.current?.value) {
      mutation.mutate({ username: inputElement.current?.value });
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
