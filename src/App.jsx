import { useState, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkToken, getUser } from "./features/user.slice";
import Header from "./Component/Header";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.userState);

  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
  }, []);

  return (
    <>
      {user && <Header />}
      <Outlet />
    </>
  );
}

export default App;
