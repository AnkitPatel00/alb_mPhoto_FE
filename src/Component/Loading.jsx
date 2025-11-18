import LoadingWave from "../assets/Material wave loading.json";
import { Player } from "@lottiefiles/react-lottie-player";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
      }}
    >
      <Player
        autoplay
        loop
        src={LoadingWave}
        style={{ height: "220px", width: "220px" }}
      />
    </div>
  );
};

export default Loading;
