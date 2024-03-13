import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { Page } from "../models/page.ts";
import { Form, useActionData, useNavigate } from "react-router-dom";
import { postRegister } from "../api/user.ts";
import { isOfTypeUser, User } from "../models/user.ts";
import { isOfTypeError } from "../models/error.ts";
import { useEffect } from "react";
import { ChatPage } from "./ChatPage.tsx";
import { useUserStore } from "../store/userStore.tsx";
import { setUserToLocalStorage } from "../storage/user.ts";

export const Register: Page = () => {
  const data = useActionData();
  const isError = isOfTypeError(data);
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  useEffect(() => {
    if (isOfTypeUser(data)) {
      setUser(data);
      navigate(ChatPage.path);
    }
  }, [data]);

  return (
    <Form method="post" action="/register">
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

          <TextField
            error={isError}
            label="Username"
            name="username"
            fullWidth
            helperText={isError ? data.message : ""}
          />

          <Button type="submit" variant="contained" color="secondary">
            Anmelden
          </Button>
        </Stack>
      </Box>
    </Form>
  );
};

Register.path = "/register";

Register.action = async ({ request }) => {
  let formData = await request.formData();
  const username = formData.get("username") as string | null;

  if (username) {
    let user: User | null = null;
    try {
      user = await postRegister({ username });
      setUserToLocalStorage(user);
    } catch (e) {
      console.error(e);
    }

    return user;
  } else {
    return { message: "Username required" };
  }
};
