import { useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Form, useActionData, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore.tsx";
import { Page } from "../models/page.ts";
import { postRegister } from "../api/user.ts";
import { isOfTypeError } from "../models/error.ts";
import { User } from "../models/user.ts";

export const Register: Page = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useUserStore();
  const data = useActionData();

  if (loggedInUser) {
    navigate("/chat");
    return null;
  }

  useEffect(() => {
    if (data) {
      if (isOfTypeError(data)) {
        console.error("Error logging in");
      } else {
        setLoggedInUser(data as User);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/chat");
      }
    }
  }, [data]);

  return (
    <Form method="POST" action="/register">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Typography
          sx={{
            mb: 3,
          }}
          variant="h6"
        >
          Chatroom Login
        </Typography>

        <TextField
          label="Name"
          name="username"
          sx={{
            width: "300px",
          }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 3,
          }}
        >
          Anmelden
        </Button>
      </Box>
    </Form>
  );
};

Register.path = "register";

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
