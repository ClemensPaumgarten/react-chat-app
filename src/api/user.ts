import { User } from "../models/user.ts";
import { API_URL } from "../constants.ts";
import { handleApiResponse } from "./index.ts";

export const postRegister = async (data: {
  username: string;
}): Promise<User> => {
  return handleApiResponse<User>(
    await fetch(`${API_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),
  );
};

export const postRefresh = async (storedUserId: string): Promise<User> => {
  return handleApiResponse<User>(
    await fetch(`${API_URL}/user/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: storedUserId }),
    }),
  );
};

export const getUsers = async (): Promise<User[]> => {
  return handleApiResponse<User[]>(await fetch(`${API_URL}/user/users`));
};
