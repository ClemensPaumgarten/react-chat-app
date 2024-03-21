import { Sidebar } from "./Sidebar.tsx";
import { useUserStore } from "../../store/userStore.tsx";

export const SidebarContainer = () => {
  const { user } = useUserStore();

  return user ? <Sidebar user={user} /> : null;
};
