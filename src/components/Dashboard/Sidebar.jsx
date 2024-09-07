import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "@/Hooks/useAuth";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import Hamburger from "hamburger-react";
import logo from "../../assets/logo.png";
import useRole from "@/Hooks/useRole";
import DeliveryManNav from "./DeliveryManNav";
import AdminNav from "./AdminNav";
import UserNav from "./UserNav";
import MainNav from "./MainNav";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(true);
  const [role] = useRole();

  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <>
      {/* //*?Small Screen Navbar */}
      <div className="bg-backL dark:bg-backD flex items-center justify-between md:hidden">
        <div>
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-16" />
            <span className="font-open font-bold text-headL dark:text-headD ">
              ParcelPro
            </span>
          </Link>
        </div>
        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <Hamburger size={20} color="#FF5757" direction="right" />
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`bg-backL dark:bg-backD z-10 md:fixed flex flex-col justify-between overflow-x-hidden font-open font-medium text-headL dark:text-headD w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-butD dark:bg-butL mx-auto">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Logo" className="h-8" />
              <span className=" font-bold font-open text-headL dark:text-headD">
                ParcelPro
              </span>
            </Link>
          </div>
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              <MainNav />
              {role === "user" && <UserNav />}
              {role === "deliveryMan" && <DeliveryManNav />}
              {role === "admin" && <AdminNav />}
            </nav>
          </div>
        </div>
        <div>
          <hr />
          {/* Profile Menu */}
          <NavLink
            to="profile"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                isActive ? "bg-gray-300  text-gray-700" : ""
              }`
            }
          >
            <FcSettings className="w-5 h-5" />

            <span className="mx-4">Profile</span>
          </NavLink>
          <button
            onClick={logOut}
            className="flex w-full items-center px-4 py-2 mt-5 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
