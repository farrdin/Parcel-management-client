import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useRole from "@/Hooks/useRole";
import Spinner from "@/components/shared/Spinner";

const DeliveryManRoute = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) return <Spinner />;
  if (role === "deliveryMan") return children;
  return <Navigate to="/dashboard" />;
};

export default DeliveryManRoute;

DeliveryManRoute.propTypes = {
  children: PropTypes.element,
};
