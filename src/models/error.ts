export type BackendError = {
  status: number;
  message: string;
};

export const isOfTypeError = (error: unknown): error is BackendError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "message" in error
  );
};
