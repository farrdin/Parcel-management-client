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
    <div className="flex items-center justify-between shadow-lg fixed top-0 z-50 w-full bg-backL dark:bg-backD font-open">
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
          <span className="text-2xl font-medium text-headL dark:text-headD">
            Parcel
            <span className="text-base text-butL">Pro</span>
          </span>
        </Link>
      </div>
      {/* // ?center section */}
      <div className="hidden lg:flex lg:items-center lg:justify-center flex-grow">
        <ul className="flex space-x-4 text-sm text-headL dark:text-headD">
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
              <button className="bg-butL dark:bg-butD hover:bg-butD hover:dark:bg-butL text-paraD dark:text-headL hover:dark:text-paraD hover:text-headL px-4 py-2 rounded-md font-semibold font-open">
                Login
              </button>
            </NavLink>
            <NavLink to="/register">
              <button className="bg-butL dark:bg-butD hover:bg-butD hover:dark:bg-butL text-paraD dark:text-headL hover:dark:text-paraD hover:text-headL px-4 py-2 rounded-md font-semibold font-open">
                Register
              </button>
            </NavLink>
          </div>
        )}
        <ModeToggle />
      </div>
      {/* // ?Hamburger section */}
      {menuOpen && (
        <div className="lg:hidden absolute top-[100%] left-0 w-[150px] bg-backL dark:bg-backL shadow-lg z-50 rounded-md ">
          <ul className="py-4 px-2 text-headL dark:text-headD">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => [
                  isActive
                    ? "bg-butD dark:bg-butL block  py-1 pl-2 rounded-sm"
                    : " hover:bg-butD hover:dark:bg-butL text-paraD dark:text-headL hover:dark:text-paraD hover:text-headL  block rounded-sm pl-2 py-1",
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
                    : " hover:bg-butD hover:dark:bg-butL text-paraD dark:text-headL hover:dark:text-paraD hover:text-headL block rounded-sm pl-2 py-1",
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
                        : "hover:bg-butD hover:dark:bg-butL text-paraD dark:text-headL hover:dark:text-paraD hover:text-headL block rounded-sm pl-2 py-1",
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
                        : "hover:bg-butD hover:dark:bg-butL text-paraD dark:text-headL hover:dark:text-paraD hover:text-headL block rounded-sm pl-2 py-1",
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
