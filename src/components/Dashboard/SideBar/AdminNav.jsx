import { NavLink } from "react-router-dom";
import { MdDeliveryDining } from "react-icons/md";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { ImStatsBars } from "react-icons/im";

const AdminNav = () => {
  return (
    <>
      <NavLink
        to="statistics"
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
      <NavLink
        to="all-parcels"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
            isActive ? "bg-gray-300  text-gray-700" : ""
          }`
        }
      >
        <MdProductionQuantityLimits className="w-5 h-5" />

        <span className="mx-4">All Parcels</span>
      </NavLink>
      <NavLink
        to="all-users"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
            isActive ? "bg-gray-300  text-gray-700" : ""
          }`
        }
      >
        <FaUsers className="w-5 h-5" />
        <span className="mx-4">All Users</span>
      </NavLink>
      <NavLink
        to="all-deliveryman"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
            isActive ? "bg-gray-300  text-gray-700" : ""
          }`
        }
      >
        <MdDeliveryDining className="w-5 h-5" />
        <span className="mx-4">All Delivery Man</span>
      </NavLink>
    </>
  );
};

export default AdminNav;
