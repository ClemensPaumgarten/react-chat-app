import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { postRegister } from "../api/user.ts";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore.tsx";

export const Register: FunctionComponent = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [loggedInUser, setLoggedInUser] = useUserStore();

  useEffect(() => {
    if (loggedInUser?.username && loggedInUser?.id) {
      navigate("/chat");
    }
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setName(value);
  };

  const onLogin = async () => {
    if (name) {
      const [user, error] = await postRegister({ username: name });

      if (error) {
        console.error(error);
      }

      if (user) {
        setLoggedInUser(user);
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/chat");
      }
    }
  };

  return (
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
        value={name}
        onChange={onChange}
        sx={{
          width: "300px",
        }}
      />

      <Button
        onClick={onLogin}
        variant="contained"
        sx={{
          mt: 3,
        }}
      >
        Anmelden
      </Button>
    </Box>
  );
};
