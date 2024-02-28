import { useRef } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
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
        postRegister({ username: value }).then(([user]) => {
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
        width: "400px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>Chatroom</Typography>

      <TextField inputRef={inputElement} />

      <Button onClick={onClick}>Anmelden</Button>
    </Box>
  );
};

Register.path = "login";

Register.action = async ({ request }) => {
  let formData = await request.formData();

  const username = formData.get("username");

  if (username) {
    const [user, error] = await postRegister({
      username: formData.get("username") as string,
    });

    if (error) {
      return error;
    } else {
      return user;
    }
  }

  return null;
};
