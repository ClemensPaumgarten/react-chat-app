export type BaseError = {
  message: string;
};

export const isOfTypeError = (error: unknown): error is BackendError => {
  return typeof error === "object" && error !== null && "message" in error;
};

export type BackendError = {
  status: number;
} & BaseError;

export const isOfTypeBackendError = (error: unknown): error is BackendError => {
  return isOfTypeBackendError(error) && "status" in error;
};
