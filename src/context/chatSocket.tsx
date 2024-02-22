// import { ChatRoom, Chat } from "../models/chat.ts";
// import React, { FunctionComponent, PropsWithChildren, useEffect } from "react";
// import { io, Socket } from "socket.io-client";
//
// type ChatSocket = {
//   connect: () => void;
//   chatRooms: string[];
//
//   send: (message: string, chatRoomId: string, from: string) => void;
//   openRoom: (userA: Chat, userB: Chat) => Promise<ChatRoom>;
// };
//
// const ChatApiContext = React.createContext<ChatSocket | null>(null);
//
// export const ChapApiProvider: FunctionComponent<PropsWithChildren<unknown>> = ({
//   children,
// }) => {
//   let socket: Socket | null = null;
//   const connect = (username: string) => {
//     socket = io("http://localhost:3001", { auth: { username } });
//
//     socket.on("connect", () => {
//       console.log("connected");
//     });
//   };
//
//   const sendMessage = () => {
//     if (socket) {
//       socket.emit("message", "Hello World");
//     }
//   };
//
//   const openRoom = (userA: Chat, userB: Chat): Promise<ChatRoom> => {
//     return new Promise((resolve) => {
//       if (socket) {
//         socket.emit("openRoom", { userA, userB }, (room: ChatRoom) => {
//           return resolve(room);
//         });
//       } else {
//         throw new Error("Socket not connected");
//       }
//     });
//   };
//
//   useEffect(() => {
//     if (socket) {
//       socket.on("message", (message) => {
//         console.log(message);
//       });
//     }
//   }, [socket]);
//
//   return (
//     <ChatApiContext.Provider
//       // value={{
//         connect
//       }}
//     >
//       {children}
//     </ChatApiContext.Provider>
//   );
// };
