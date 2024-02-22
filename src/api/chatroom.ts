import { ChatRoom, User } from "../models/user.ts";
import { API_URL } from "../constants.ts";
import { BackendError } from "../models/error.ts";

export const getChatroom = async (chatroomId: string): Promise<ChatRoom> => {
  const response = await fetch(`${API_URL}/chatroom/${chatroomId}`);
  return await response.json();
};

export const getOpenChatrooms = async (userId: string): Promise<ChatRoom[]> => {
  const response = await fetch(`${API_URL}/chatroom/user/${userId}`);
  return await response.json();
};

export const postChatroom = async (
  userIds: User["id"][],
): Promise<[ChatRoom | null, BackendError | null]> => {
  const response = await fetch(`${API_URL}/chatroom/chatroom`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userIds }),
  });

  if (response.ok) {
    return [(await response.json()) as ChatRoom, null];
  }

  if (response.status < 500) {
    return [null, (await response.json()) as BackendError];
  } else {
    return [null, { status: 500, message: "Server error" }];
  }
};

export const postMessage = async ({
  chatRoomId,
  text,
  authorId,
}: {
  chatRoomId: ChatRoom["id"];
  text: string;
  authorId: string;
}): Promise<[ChatRoom | null, BackendError | null]> => {
  const response = await fetch(`${API_URL}/chatroom/${chatRoomId}/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, authorId }),
  });

  if (response.ok) {
    return [(await response.json()) as ChatRoom, null];
  }

  if (response.status < 500) {
    return [null, (await response.json()) as BackendError];
  } else {
    return [null, { status: 500, message: "Server error" }];
  }
};
