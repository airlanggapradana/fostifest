import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/AppSidebar.tsx";
import {Outlet} from "react-router";
import Cookies from "js-cookie";
import {UserSessionContext} from "@/hooks/context.ts";
import {decodeJwt} from "@/utils/helper.ts";
import {ArrowLeft} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router";

const ProfileLayout = () => {
  const token = Cookies.get('accessToken');
  const navigate = useNavigate();
  if (!token) return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-teal-900 to-teal-950">
      <div
        className="bg-teal-800/80 backdrop-blur-sm rounded-xl border border-teal-700/50 shadow-2xl p-8 max-w-md text-center animate-in fade-in duration-500">
        <div className="flex justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" viewBox="0 0 20 20"
               fill="currentColor">
            <path fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"/>
          </svg>
        </div>
        <p className="text-red-400 text-xl font-semibold mb-3">Error: No access token found.</p>
        <p className="text-gray-300 mb-4">Please log in to continue.</p>
        <Button
          onClick={() => navigate('/auth/login')}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-medium rounded-lg transition-colors duration-200 flex items-center mx-auto">
          <ArrowLeft/>
          Go to Login
        </Button>
      </div>
    </div>
  );
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
