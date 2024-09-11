import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "@/components/shared/Spinner";
import useRole from "@/Hooks/useRole";

const UserRoute = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) return <Spinner />;
  if (role === "user") return children;
  return <Navigate to="/dashboard" />;
};

export default UserRoute;

UserRoute.propTypes = {
  children: PropTypes.element,
};
