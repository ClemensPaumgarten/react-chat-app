import { User } from "../models/user.ts";
import { API_URL } from "../constants.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BackendError } from "../models/error.ts";
import { handleApiResponse } from "./index.ts";

export const usePostRegister = () => {
  return useMutation<User, BackendError, { username: string }>({
    mutationFn: async (data: { username: string }) => {
      const response = await fetch(`${API_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return handelApiResponse<User>(response);
    },
  });
};

export const postRegister = async (data: { username: string }) => {
  const response = await fetch(`${API_URL}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleApiResponse<User>(response);
};

export const usePostRefresh = () =>
  useMutation<User, BackendError, string>({
    mutationFn: async (loggedInUser: string) => {
      const response = await fetch(`${API_URL}/user/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: loggedInUser }),
      });

      return handleApiResponse<User>(response);
    },
  });

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

export const GET_USERS_QUERY_KEY = "GET_USERS";
export const useGetUsers = (refetchInterval: number | false = false) =>
  useQuery<User[]>({
    initialData: [],
    queryKey: [GET_USERS_QUERY_KEY],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/user/users`);
      return handleApiResponse<User[]>(response);
    },
    refetchInterval: refetchInterval,
  });
