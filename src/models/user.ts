export type User = {
  id: string;
  username: string;
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
