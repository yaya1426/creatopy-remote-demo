import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "store/hooks";

export const useCheckAuth = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate, isAuthenticated]);
};
