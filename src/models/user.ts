export type User = {
  id: string;
  username: string;
};

export const isOfTypeUser = (obj: unknown): obj is User => {
  return (
    typeof obj === "object" && obj !== null && "id" in obj && "username" in obj
  );
};
export type ChatMessage = {
  id: string;
  text: string;
  author: User["id"];
};

export type ChatRoom = {
  id: string;
  users: User[];
  messages: ChatMessage[];
};
