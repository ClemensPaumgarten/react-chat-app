export type User = {
  id: string;
  username: string;
};

export const isOfTypeUser = (obj: object | null): obj is User => {
  if (!obj) return false;

  const user = obj as User;
  return user.id !== undefined && user.username !== undefined;
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
