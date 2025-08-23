import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar"
import {Home, Settings} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import Cookies from "js-cookie";
import {decodeJwt} from "@/utils/helper.ts";
import {useLocation} from "react-router";

// Menu items.
const items = [
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

export function AppSidebar() {
  const token = Cookies.get("accessToken");
  const decodedToken = decodeJwt(token as string);
  const location = useLocation();
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={`https://ui-avatars.com/api/?name=${decodedToken?.payload.name}`} alt="User Avatar"/>
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">{decodedToken?.payload.name}</span>
            <span className="text-[12px] text-muted-foreground">{decodedToken?.payload.email}</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Button
                        asChild
                        variant="ghost"
                        className={`w-full justify-start ${isActive ? " bg-teal-100 font-semibold text-teal-500" : "font-normal text-muted-foreground"}`}
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
      <SidebarFooter/>
    </Sidebar>
  )
}