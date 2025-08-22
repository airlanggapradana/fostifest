import {Outlet} from "react-router";

const RegistrationLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-300 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Outlet/>
      </div>
    </div>
  );
};

export default RegistrationLayout;
