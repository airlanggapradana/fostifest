import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/AppSidebar.tsx";
import {Outlet} from "react-router";

const ProfileLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <main>
        <SidebarTrigger/>
        <Outlet/>
      </main>
    </SidebarProvider>
  );
};

export default ProfileLayout;
