import { Box, Button, Stack, Typography } from "@mui/material";
import { Page } from "../models/page.ts";
import { postRegister } from "../api/user.ts";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../store/useAuth.tsx";
import { useInput } from "../hooks/useInput.ts";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TextInput } from "../components/TextInput/TextInput.tsx";

export const Register: Page = () => {
  const { setUser } = useAuth();
  const { mutateAsync: login } = useMutation({
    mutationFn: postRegister,
  });
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const { value, onChange, error, onSubmit } = useInput({
    initialValue: "",
    validate: (value) => (value.length === 0 ? "Username is required" : null),
    onValidSubmit: (value) => {
      login({
        username: value,
      }).then((user) => {
        setUser(user);

        navigate(
          params.get("redirect")
            ? decodeURIComponent(params.get("redirect")!)
            : "/",
        );
      });
    },
  });

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

        <TextInput
          label="Username"
          value={value}
          onChange={onChange}
          error={error}
        />

        <Button variant="contained" color="secondary" onClick={onSubmit}>
          Anmelden
        </Button>
      </Stack>
    </Box>
  );
};

Register.path = "login";
