import { useCallback, useState } from "react";

type UseInputProps = {
  initialValue?: string;
  validate: (value: string) => string | null;
  onValidSubmit: (value: string) => void;
};
export const useInput = ({
  validate,
  onValidSubmit,
  initialValue,
}: UseInputProps) => {
  const [value, setValue] = useState(initialValue || "");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target?.value || "");
    setError(""); // clear error on input
  };

  const onSubmit = useCallback(() => {
    const validationError = validate(value);
    if (validationError) {
      setError(validationError);
    } else {
      onValidSubmit(value);
    }
  }, [value, setError, onValidSubmit]);

  return { value, onChange, onSubmit, error };
};
