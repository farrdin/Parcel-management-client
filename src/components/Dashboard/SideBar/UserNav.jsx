import { NavLink } from "react-router-dom";
import { BiSolidCartAdd } from "react-icons/bi";
import { TbTruckDelivery } from "react-icons/tb";

const UserNav = () => {
  return (
    <>
      {/* // ?MY parcels */}
      <NavLink
        to="my-parcel"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
            isActive ? "bg-gray-300  text-gray-700" : ""
          }`
        }
      >
        <TbTruckDelivery className="w-5 h-5" />

        <span className="mx-4">My Parcels</span>
      </NavLink>
      {/* //? book parcels */}
      <NavLink
        to="book-parcel"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
            isActive ? "bg-gray-300  text-gray-700" : ""
          }`
        }
      >
        <BiSolidCartAdd className="w-5 h-5" />
        <span className="mx-4">Book Parcels</span>
      </NavLink>
    </>
  );
};

export default UserNav;
