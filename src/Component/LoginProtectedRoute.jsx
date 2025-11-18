import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUser } from "../features/user.slice";

const LoginProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.userState);

  return user ? <Navigate to="/" replace /> : children;
};

export default LoginProtectedRoute;
