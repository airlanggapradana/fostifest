import {FloatingDock} from "@/components/ui/floating-dock";
import {
  IconBookmarks,
  IconBrandInstagram,
  IconHome,
} from "@tabler/icons-react";
import {FaTimeline, FaRegCircleQuestion} from "react-icons/fa6";
import {RiLoginBoxLine, RiLogoutBoxLine} from "react-icons/ri";
import fosti from '../assets/1630658187270-Photoroom.png'
import Cookies from "js-cookie";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {decodeJwt} from "@/utils/helper.ts";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router";

export function Navbar() {
  const navigate = useNavigate();
  const token = Cookies.get("accessToken");
  console.log(token);

  const decodedToken = decodeJwt(token);

  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full  text-neutral-300"/>
      ),
      href: "#",
    },

    {
      title: "Categories",
      icon: (
        <IconBookmarks className="h-full w-full  text-neutral-300"/>
      ),
      href: "#categories",
    },
    {
      title: "Timeline",
      icon: (
        <FaTimeline className="h-full w-full  text-neutral-300"/>
      ),
      href: "#",
    },
    {
      title: "FOSTI UMS",
      icon: (
        <img
          src={fosti}
          width={64}
          height={64}
          alt="Aceternity Logo"
        />
      ),
      href: "https://fostiums.org",
    },
    {
      title: "FAQ",
      icon: (
        <FaRegCircleQuestion className="h-full w-full  text-neutral-300"/>
      ),
      href: "#faq",
    },

    token
      ? {
        title: "Profile",
        icon: (
          <Avatar>
            <AvatarImage src={`https://ui-avatars.com/api/?name=${decodedToken?.payload.name}`} alt="User Avatar"/>
            <AvatarFallback>{decodedToken?.payload.name.slice(0, 1)}</AvatarFallback>
          </Avatar>
        ),
        href: "/profile",
      }
      : {
        title: "Login",
        icon: (
          <RiLoginBoxLine className="h-full w-full  text-neutral-300"/>
        ),
        href: "/login",
      },
    {
      title: "Instagaram",
      icon: (
        <IconBrandInstagram className="h-full w-full  text-neutral-300"/>
      ),
      href: "#",
    },
  ];
  return (
    <>
      {token && (
        <Button
          onClick={() => {
            Cookies.remove("accessToken");
            navigate('/', {replace: true});
          }}
          variant={"secondary"}
          className="fixed bottom-10 left-5 z-[60]"
        >
          <RiLogoutBoxLine className="h-5 w-5"/>
          <span className="hidden sm:inline">Logout</span>
        </Button>
      )}
      <div className="fixed bottom-5 left-0 z-50 flex items-center justify-center h-[5rem] w-full">
        <FloatingDock
          mobileClassName="flex sm:hidden" // only for demo, remove for production
          desktopClassName="hidden sm:flex"
          items={links}
        />
      </div>
    </>
  );
}
