import { User } from "../models/user.ts";
import { API_URL } from "../constants.ts";
import { handelApiResponse } from "./index.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BackendError } from "../models/error.ts";

export const postRegister = async (data: { username: string }) => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handelApiResponse<User>(response);
};

export const usePostRefresh = () =>
  useMutation<User, BackendError, string>({
    mutationFn: async (loggedInUser: string) => {
      const response = await fetch(`${API_URL}/users/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: loggedInUser }),
      });

      return handelApiResponse<User>(response);
    },
  });

export const GET_USERS_QUERY_KEY = "GET_USERS";
export const useGetUsers = (refetchInterval: number | false = false) =>
  useQuery<User[]>({
    initialData: [],
    queryKey: [GET_USERS_QUERY_KEY],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/users`);
      return handelApiResponse<User[]>(response);
    },
    refetchInterval: refetchInterval,
  });
