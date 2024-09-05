import { Link, NavLink } from "react-router-dom";
import useAuth from "@/Hooks/useAuth";
import { ModeToggle } from "../theme/ModeToggle";
import { useState } from "react";
import logo from "../../assets/logo.png";
import { ProfileIcon } from "./ProfileIcon";
import { Turn as Hamburger } from "hamburger-react";

const Navbar = () => {
  const { user } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="flex items-center justify-between shadow-lg fixed top-0 z-10 w-full bg-white dark:bg-gray-800">
      {/* // ?Logo & Name section */}
      <div className="flex items-center">
        <button
          className="pl-2 text-gray-700 dark:text-gray-300 lg:hidden"
          onClick={toggleMenu}
        >
          <Hamburger
            toggled={menuOpen}
            toggle={setMenuOpen}
            size={20}
            color="#FF5757"
            direction="right"
          />
        </button>
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-16" />
          <span className="text-xl font-medium text-gray-800 dark:text-white">
            ParcelPro
          </span>
        </Link>
      </div>
      {/* // ?center section */}
      <div className="hidden lg:flex lg:items-center lg:justify-center flex-grow">
        <ul className="flex space-x-4 text-sm text-gray-800 dark:text-gray-300">
          <li className="py-2">
            <NavLink
              to="/"
              className={({ isActive }) => [
                isActive ? "bg-butD dark:bg-butL rounded-sm py-1 px-3" : "",
              ]}
            >
              Home
            </NavLink>
          </li>
          <li className="py-2">
            <NavLink
              to="dashboard"
              className={({ isActive }) => [
                isActive ? "bg-butD dark:bg-butL rounded-sm py-1 px-3" : "",
              ]}
            >
              Dashboard
            </NavLink>
          </li>
        </ul>
      </div>
      {/* // ?button and themeToogle section */}
      <div className="flex items-center space-x-4 pr-2">
        {user ? (
          <ProfileIcon />
        ) : (
          <div className="hidden md:flex space-x-4">
            <NavLink to="/login">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Login
              </button>
            </NavLink>
            <NavLink to="/register">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Register
              </button>
            </NavLink>
          </div>
        )}
        <ModeToggle />
      </div>
      {/* // ?Hamburger section */}
      {menuOpen && (
        <div className="lg:hidden absolute top-[100%] left-0 w-[150px] bg-white dark:bg-gray-500 shadow-lg z-50 rounded-md">
          <ul className="py-4 px-2 text-gray-700 dark:text-gray-300">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => [
                  isActive
                    ? "bg-butD dark:bg-butL block  py-1 pl-2 rounded-sm"
                    : "",
                ]}
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="dashboard"
                className={({ isActive }) => [
                  isActive
                    ? "bg-butD dark:bg-butL block py-1 pl-2 rounded-sm"
                    : "",
                ]}
                onClick={closeMenu}
              >
                Dashboard
              </NavLink>
            </li>
            {user ? null : (
              <>
                <li className="md:hidden">
                  <NavLink
                    to="/login"
                    className={({ isActive }) => [
                      isActive
                        ? "bg-butD dark:bg-butL block py-1 pl-2 rounded-sm"
                        : "",
                    ]}
                    onClick={closeMenu}
                  >
                    Login
                  </NavLink>
                </li>
                <li className="md:hidden">
                  <NavLink
                    to="/register"
                    className={({ isActive }) => [
                      isActive
                        ? "bg-butD dark:bg-butL block py-1 pl-2 rounded-sm"
                        : "",
                    ]}
                    onClick={closeMenu}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
