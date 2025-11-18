import { Player } from "@lottiefiles/react-lottie-player";
import GoodBye from "../assets/Good Bye.json";

const LogoutSreen = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ width: "100vw", height: "90vh" }}
    >
      <Player
        autoplay
        loop
        src={GoodBye}
        style={{ height: "520px", width: "520px" }}
      />
    </div>
  );
};

export default LogoutSreen;
