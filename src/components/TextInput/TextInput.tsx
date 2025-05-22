import { FunctionComponent } from "react";
import { TextField } from "@mui/material";

type TextInputProps = {
  label?: string;
  value: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

export const TextInput: FunctionComponent<TextInputProps> = ({
  label,
  value,
  onChange,
  error,
}) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      helperText={!!error ? error : ""}
      fullWidth
      error={!!error}
    />
  );
};
