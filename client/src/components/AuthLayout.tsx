import {Outlet} from "react-router";
import {FlickeringGrid} from "@/components/magicui/flickering-grid";

const AuthLayout = () => {
  return (
    <div className={'relative w-full h-screen bg-gray-900 text-gray-100 flex items-center justify-center'}>
      <FlickeringGrid
        className="absolute inset-0 z-0 size-full"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.5}
        flickerChance={0.1}
      />
      <Outlet/>
    </div>
  );
};

export default AuthLayout;
