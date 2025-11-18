import axios from "axios";
import { Player } from "@lottiefiles/react-lottie-player";
import galleryIcon from "../assets/GalleryIcon.json";
import googleicon from "../assets/google.png";

const Login = () => {
  console.log(import.meta.env.VITE_API_URL);

  function handleLogin() {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  }

  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center bg-dark">
        <Player
          autoplay
          loop
          src={galleryIcon}
          style={{ height: "220px", width: "220px" }}
        />
        <h1 className="fw-bold mt-3">Kaviopix</h1>
        <button
          className="btn btn-sm btn-light mt-3 px-4 py-2"
          onClick={handleLogin}
        >
          Login with
          <img className="ms-2" src={googleicon} width={"25px"} />
        </button>
      </div>
    </>
  );
};

export default Login;
