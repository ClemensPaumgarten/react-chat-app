import { ChatRoom, User } from "../models/user.ts";
import { API_URL } from "../constants.ts";
import { handleApiResponse } from "./index.ts";

export const getChatroom = async (chatroomId: string): Promise<ChatRoom> => {
  const response = await fetch(`${API_URL}/chatroom/${chatroomId}`);
  return handleApiResponse<ChatRoom>(response);
};

export const getOpenChatrooms = async (userId: string): Promise<ChatRoom[]> => {
  const response = await fetch(`${API_URL}/chatroom/user/${userId}`);
  return handleApiResponse<ChatRoom[]>(response);
};

export const postChatroom = async (
  userIds: User["id"][],
): Promise<ChatRoom> => {
  const response = await fetch(`${API_URL}/chatroom/chatroom`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userIds }),
  });

  return handleApiResponse<ChatRoom>(response);
};

export const postMessage = async ({
  chatRoomId,
  text,
  authorId,
}: {
  chatRoomId: ChatRoom["id"];
  text: string;
  authorId: string;
}): Promise<ChatRoom> => {
  const response = await fetch(`${API_URL}/chatroom/${chatRoomId}/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, authorId }),
  });

  return handleApiResponse<ChatRoom>(response);
};
