import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { logout } from "store/slices/userSlice";

export const Navbar: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  return isAuthenticated ? (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Creatopy Items App
        </Link>
        <form className="d-flex">
          <div className="mt-1 me-2">Welcome, {user?.name}</div>
          <button
            className="btn btn-outline-secondary"
            onClick={() => dispatch(logout())}
          >
            Logout
          </button>
        </form>
      </div>
    </nav>
  ) : (
    <></>
  );
};
