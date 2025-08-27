import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar"
import {Home, LogOut, Settings} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {useLocation, useNavigate} from "react-router";
import {useUserSessionContext} from "@/hooks/context.ts";
import Cookies from "js-cookie";
import {BiUser} from "react-icons/bi";

// Menu items.
const participantItems = [
  {
    title: "Home",
    url: "/profile",
    icon: Home,
  },
  {
    title: "Settings",
    url: "/profile/settings",
    icon: Settings,
  },
]

const adminItems = [
  {
    title: "Dashboard",
    url: "/profile/admin",
    icon: Home,
  },
  {
    title: "Users Management",
    url: "/profile/users",
    icon: BiUser,
  },
]

export function AppSidebar() {
  const navigate = useNavigate();
  const session = useUserSessionContext()
  const location = useLocation();
  return (
    <Sidebar className={'border-none'}>
      <SidebarHeader className={'bg-teal-950 py-4'}>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={`https://ui-avatars.com/api/?name=${session.payload.name}`} alt="User Avatar"/>
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-gray-100">{session.payload.name}</span>
            <span className="text-[12px] text-gray-300">{session.payload.email}</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className={'bg-teal-950'}>
        <SidebarGroup>
          <SidebarGroupLabel className={'text-gray-100'}>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {session.payload.role === 'PARTICIPANT' ? participantItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild size={'lg'}>
                      <Button
                        asChild
                        variant="ghost"
                        className={`w-full justify-start hover:bg-teal-900 hover:text-teal-50 transition-colors active:bg-teal-800 active:text-teal-300 ${isActive ? " bg-teal-700 font-semibold text-teal-300" : "font-normal text-gray-300"}`}
                      >
                        <a href={item.url} className="flex items-center gap-2">
                          <item.icon/>
                          <span>{item.title}</span>
                        </a>
                      </Button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              }) : adminItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild size={'lg'}>
                      <Button
                        asChild
                        variant="ghost"
                        className={`w-full justify-start hover:bg-teal-900 hover:text-teal-50 transition-colors active:bg-teal-800 active:text-teal-300 ${isActive ? " bg-teal-700 font-semibold text-teal-300" : "font-normal text-gray-300"}`}
                      >
                        <a href={item.url} className="flex items-center gap-2">
                          <item.icon/>
                          <span>{item.title}</span>
                        </a>
                      </Button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className={'bg-teal-950'}>
        <Button
          onClick={() => {
            Cookies.remove('accessToken')
            navigate('/login', {replace: true})
          }}
        >
          <LogOut className="h-6 w-6"/>
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}