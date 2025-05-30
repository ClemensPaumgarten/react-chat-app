import { ChatRoom, User } from "../models/user.ts";
import { API_URL } from "../constants.ts";
import { handelApiResponse } from "./index.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const GET_CHAT_ROOM = "CURRENT_CHATROOM";
export const useGetChatroom = (
  chatroomId: string | undefined,
  refetchInterval: number | false = false,
) =>
  useQuery({
    queryKey: [GET_CHAT_ROOM],
    queryFn: async () => {
      if (!chatroomId) {
        return null;
      }

      const response = await fetch(`${API_URL}/chatrooms/${chatroomId}`);
      return handelApiResponse<ChatRoom>(response);
    },
    refetchInterval: refetchInterval,
    initialData: null,
    enabled: !!chatroomId,
  });

export const GET_OPEN_CHAT_ROOM_QUERY = "OPEN_CHATROOMS";
export const useGetOpenChatrooms = (user: User | null) =>
  useQuery({
    queryKey: [GET_OPEN_CHAT_ROOM_QUERY],
    queryFn: async () => {
      if (user) {
        const response = await fetch(`${API_URL}/chatrooms/user/${user.id}`);
        return handelApiResponse<ChatRoom[]>(response);
      }
      return [];
    },
    enabled: !!user,
  });

export const usePostChatroom = () => {
  const queryClient = useQueryClient();
  return useMutation<ChatRoom, unknown, User["id"][]>({
    mutationFn: async (userIds: User["id"][]) => {
      const response = await fetch(`${API_URL}/chatrooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userIds }),
      });

      return handelApiResponse<ChatRoom>(response);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: [GET_OPEN_CHAT_ROOM_QUERY],
      });
    },
  });
};

export const usePostMessage = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ChatRoom,
    unknown,
    { chatRoomId: ChatRoom["id"]; text: string; authorId: string },
    ChatRoom
  >({
    mutationFn: async ({ chatRoomId, text, authorId }): Promise<ChatRoom> => {
      const response = await fetch(
        `${API_URL}/chatrooms/${chatRoomId}/message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text, authorId }),
        },
      );

      return handelApiResponse<ChatRoom>(response);
    },
    onMutate: async ({ text, authorId }) => {
      await queryClient.cancelQueries({ queryKey: [GET_CHAT_ROOM] });
      const previousChatRoom = queryClient.getQueryData<ChatRoom>([
        GET_CHAT_ROOM,
      ]);

      if (previousChatRoom) {
        const optimisticChatRoom: ChatRoom = {
          ...previousChatRoom,
          messages: [
            ...previousChatRoom.messages,
            {
              id: `temp-${Date.now()}`,
              text,
              author: authorId,
            },
          ],
        };
        queryClient.setQueryData([GET_CHAT_ROOM], optimisticChatRoom);
      }
      return previousChatRoom;
    },
    onError: (_, _1, context) => {
      if (context) {
        queryClient.setQueryData([GET_CHAT_ROOM], context);
      }
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: [GET_CHAT_ROOM],
      });
    },
  });
};
