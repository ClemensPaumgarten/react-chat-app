import { forwardRef } from "react";
import { Box, Button, TextField, TextFieldProps } from "@mui/material";

type ChatSendBarProps = {
  message: string;
  onMessageChange: TextFieldProps["onChange"];
  onSend: () => void;
};

export const ChatSendBar = forwardRef<HTMLInputElement, ChatSendBarProps>(
  function ChatSendBarRef({ onSend, message, onMessageChange }, inputRef) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <TextField
          label="Type a message"
          fullWidth
          inputRef={inputRef}
          value={message}
          onChange={onMessageChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSend();
          }}
          autoFocus
        />
        <Button
          sx={{
            mx: 2,
          }}
          variant="contained"
          color="secondary"
          onClick={onSend}
        >
          Send
        </Button>
      </Box>
    );
  },
);
