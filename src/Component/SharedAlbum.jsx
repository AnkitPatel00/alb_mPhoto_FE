import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSharedImage, setPhotoView } from "../features/photo.slice";
import PhotoCard from "./PhotoCard";
import PhotoView from "./PhotoView";
import Loading from "./Loading";

const SharedAlbum = () => {
  const dispatch = useDispatch();

  const { sharedPhotos, photoView, sharedImageState } = useSelector(
    (state) => state.photoState
  );

  useEffect(() => {
    dispatch(getSharedImage());
  }, []);

  if (sharedImageState === "loading") {
    return <Loading />;
  }

  if (sharedPhotos.length === 0) {
    return (
      <div
        className="d-flex flex-column align-items-center justify-content-center text-center p-4"
        style={{ height: "90vh", color: "white" }}
      >
        <h2 className="mb-3 fw-bold">No Photos Found</h2>

        <div
          className="p-4 rounded"
          style={{
            maxWidth: "350px",
            backgroundColor: "#1e1e1e",
            border: "1px solid #333",
          }}
        >
          <p className="mb-3" style={{ fontSize: "15px", opacity: 0.9 }}>
            Follow these steps:
          </p>

          <ul
            className="list-unstyled text-start m-0"
            style={{ fontSize: "15px" }}
          >
            <li className="mb-2">1️⃣ Create an album</li>
            <li className="mb-2">2️⃣ Upload photos</li>
            <li className="mb-2">3️⃣ Share albums with friends</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div>
      {photoView.state && <PhotoView />}

      <div className="container my-4">
        <div className="row g-3">
          {sharedPhotos.map((imgObj) => (
            <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={imgObj._id}>
              <PhotoCard imageObj={imgObj} deleteBtnVisible={false} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SharedAlbum;
