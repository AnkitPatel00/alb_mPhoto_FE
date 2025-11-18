import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logoutUser } from "../features/user.slice";
import Header from "../Component/Header";
import Albums from "../Component/Albums";
import SharedAlbum from "../Component/SharedAlbum";
import LogoutSreen from "../Component/LogoutScreen";

const Home = () => {
  const { user, statusLogout } = useSelector((state) => state.userState);
  const dispatch = useDispatch();

  if (statusLogout === "loading") {
    return <LogoutSreen />;
  }

  return (
    <>
      <SharedAlbum />
    </>
  );
};

export default Home;
