import { FunctionComponent } from "react";
import { User } from "../../models/user.ts";
import { usePostChatroom } from "../../api/chatroom.ts";
import { UserList } from "./UserList.tsx";
import { useGetUsers } from "../../api/user.ts";
import { useAuth } from "../../store/useAuth.tsx";
import { useChatStore } from "../../store/chatStore.tsx";

export const UserListContainer: FunctionComponent = () => {
  const { user: storeUser } = useAuth();
  const { setCurrentChatRoom } = useChatStore();
  const { isLoading, data: users = [] } = useGetUsers(5000);

  const { mutateAsync: postChatroom } = usePostChatroom();
  const activeUsers = users.filter((user) => user.id !== storeUser?.id) || [];

  const onOpenChatroom = async (user: User) => {
    if (storeUser) {
      postChatroom([storeUser.id, user.id]).then((chatRoom) => {
        setCurrentChatRoom(chatRoom);
      });
    }
  };

  return (
    <UserList
      activeUsers={activeUsers}
      openChatroom={onOpenChatroom}
      loading={isLoading}
    />
  );
};
