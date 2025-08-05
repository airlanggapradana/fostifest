import {FloatingDock} from "@/components/ui/floating-dock";
import {
  IconBrandInstagram,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";

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
        <IconTerminal2 className="h-full w-full  text-neutral-300"/>
      ),
      href: "#",
    },
    {
      title: "Timeline",
      icon: (
        <IconNewSection className="h-full w-full  text-neutral-300"/>
      ),
      href: "#",
    },
    {
      title: "FOSTI UMS",
      icon: (
        <img
          src="https://assets.aceternity.com/logo-dark.png"
          width={20}
          height={20}
          alt="Aceternity Logo"
        />
      ),
      href: "#",
    },
    {
      title: "FAQ",
      icon: (
        <IconExchange className="h-full w-full  text-neutral-300"/>
      ),
      href: "#",
    },

    {
      title: "Pendaftaran",
      icon: (
        <IconBrandX className="h-full w-full  text-neutral-300"/>
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
    <div className="fixed bottom-10 left-0 z-50 flex items-center justify-center h-[5rem] w-full">
      <FloatingDock
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={links}
      />
    </div>
  );
}
