import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/AppSidebar.tsx";
import {Outlet} from "react-router";
import Cookies from "js-cookie";
import {UserSessionContext} from "@/hooks/context.ts";
import {decodeJwt} from "@/utils/helper.ts";

const ProfileLayout = () => {
  const token = Cookies.get('accessToken');
  if (!token) return <div className="text-red-500">Error: No access token found. Please log in.</div>;
  const decodedToken = decodeJwt(token)
  if (!decodedToken) return <div className="text-red-500">Error: Invalid access token. Please log in again.</div>;
  return (
    <UserSessionContext.Provider value={decodedToken}>
      <SidebarProvider>
        <AppSidebar/>
        <main className={'bg-gradient-to-br from-teal-800 to-teal-950 flex-1 p-4 w-full overflow-hidden'}>
          <SidebarTrigger className={'text-gray-50'} variant={'ghost'}/>
          <Outlet/>
        </main>
      </SidebarProvider>
    </UserSessionContext.Provider>
  );
};

export default ProfileLayout;
