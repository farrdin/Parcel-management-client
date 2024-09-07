import { NavLink } from "react-router-dom";
import { ImStatsBars } from "react-icons/im";

const MainNav = () => {
  return (
    <>
      <NavLink
        to="/dashboard"
        end
        className={({ isActive }) =>
          `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
            isActive ? "bg-gray-300  text-gray-700" : ""
          }`
        }
      >
        <ImStatsBars className="w-5 h-5" />
        <span className="mx-4">Statistics</span>
      </NavLink>
    </>
  );
};

export default MainNav;
