import { Sidebar } from "./Sidebar.tsx";
import { useUserSlice } from "../../slice/userSlice.ts";

export const SidebarContainer = () => {
  const { user } = useUserSlice();

  return user ? <Sidebar user={user} /> : null;
};
