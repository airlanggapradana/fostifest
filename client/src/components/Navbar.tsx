import {FloatingDock} from "@/components/ui/floating-dock";
import {
  IconBookmarks,
  IconBrandInstagram,
  IconHome,
} from "@tabler/icons-react";
import {FaTimeline, FaRegCircleQuestion} from "react-icons/fa6";
import {RiLoginBoxLine} from "react-icons/ri";
import fosti from '../assets/1630658187270-Photoroom.png'

export function Navbar() {
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
      href: "#",
    },
    {
      title: "FAQ",
      icon: (
        <FaRegCircleQuestion className="h-full w-full  text-neutral-300"/>
      ),
      href: "#",
    },

    {
      title: "Login",
      icon: (
        <RiLoginBoxLine className="h-full w-full  text-neutral-300"/>
      ),
      href: "#",
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
    <div className="fixed bottom-5 left-0 z-50 flex items-center justify-center h-[5rem] w-full">
      <FloatingDock
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={links}
      />
    </div>
  );
}
