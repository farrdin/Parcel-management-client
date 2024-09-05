import { Navigate, useLocation } from "react-router-dom";
import useAuth from "@/Hooks/useAuth";
import Spinner from "@/components/shared/Spinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Spinner />;
  }
  if (user) {
    return children;
  }

  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default PrivateRoute;
