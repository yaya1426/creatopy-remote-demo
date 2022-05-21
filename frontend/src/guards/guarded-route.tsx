import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "store/hooks";

const GuardedRoute = () => {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate replace to="/login" />;
};

export default GuardedRoute;
