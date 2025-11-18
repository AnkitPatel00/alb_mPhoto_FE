import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUser } from "../features/user.slice";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.userState);

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
