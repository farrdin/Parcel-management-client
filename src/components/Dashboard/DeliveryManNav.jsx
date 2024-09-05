import { NavLink } from "react-router-dom";
import { MdOutlineReviews } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";

const DeliveryManNav = () => {
  return (
    <>
      <NavLink
        to="deliverylist"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
            isActive ? "bg-gray-300  text-gray-700" : ""
          }`
        }
      >
        <TbTruckDelivery className="w-5 h-5" />

        <span className="mx-4">My Delivery List</span>
      </NavLink>
      <NavLink
        to="reviews"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
            isActive ? "bg-gray-300  text-gray-700" : ""
          }`
        }
      >
        <MdOutlineReviews className="w-5 h-5" />
        <span className="mx-4">My Reviews</span>
      </NavLink>
    </>
  );
};

export default DeliveryManNav;
