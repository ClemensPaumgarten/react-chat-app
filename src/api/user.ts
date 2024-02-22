import { User } from "../models/user.ts";
import { API_URL } from "../constants.ts";
import { BackendError } from "../models/error.ts";

export const postRegister = async (data: {
  username: string;
}): Promise<[User | null, BackendError | null]> => {
  const response = await fetch(`${API_URL}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    return [(await response.json()) as User, null];
  }

  if (response.status < 500) {
    return [null, (await response.json()) as BackendError];
  } else {
    return [null, { status: 500, message: "Server error" }];
  }
};

export const postRefresh = async (
  loggedInUser: string,
): Promise<[User | null, BackendError | null]> => {
  const response = await fetch(`${API_URL}/user/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: loggedInUser }),
  });

  if (response.ok) {
    return [(await response.json()) as User, null];
  }

  if (response.status < 500) {
    return [null, (await response.json()) as BackendError];
  } else {
    return [null, { status: 500, message: "Server error" }];
  }
};

export const getUsers = async (): Promise<
  [User[] | null, BackendError | null]
> => {
  const response = await fetch(`${API_URL}/user/users`);

  if (response.ok) {
    return [(await response.json()) as User[], null];
  }

  if (response.status < 500) {
    return [null, (await response.json()) as BackendError];
  } else {
    return [null, { status: 500, message: "Server error" }];
  }
};
