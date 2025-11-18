import { useLocation, useParams } from "react-router-dom";
import PhotoForm from "./PhotoForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getImage,
  photoFormStateControll,
  setPhotoView,
  shareListFormStateControll,
} from "../features/photo.slice";
import PhotoCard from "./PhotoCard";
import ShareAlbumForm from "./ShareAlbumForm";
import { BiSolidImageAdd } from "react-icons/bi";
import { RiUserShared2Fill } from "react-icons/ri";
import PhotoView from "./PhotoView";
import Loading from "./Loading";

const AlbumPhotos = () => {
  const { albumId } = useParams();

  const dispatch = useDispatch();

  const {
    photos,
    photoFormState,
    fetchImageState,
    shareListFormState,
    photoView,
  } = useSelector((state) => state.photoState);

  useEffect(() => {
    dispatch(getImage(albumId));
  }, []);

  const handleUploadPhoto = () => {
    dispatch(photoFormStateControll(true));
  };
  const handleShareAlbum = () => {
    dispatch(shareListFormStateControll(true));
  };

  if (fetchImageState === "loading") {
    return <Loading />;
  }

  const location = useLocation();
  const name = location.state;

  return (
    <div>
      {/* Share Button (top one) */}
      <button
        onClick={handleShareAlbum}
        className="btn btn-primary position-fixed end-0 m-4 rounded-circle shadow-lg"
        style={{
          bottom: "90px", // moves UP above the upload button
          right: "50px",
          zIndex: 1000,
          width: "60px",
          height: "60px",
        }}
      >
        <RiUserShared2Fill size={24} />
      </button>

      {/* Upload Photo Button (bottom one) */}
      <button
        onClick={handleUploadPhoto}
        className="btn btn-primary position-fixed end-0 m-4 rounded-circle shadow-lg"
        style={{
          bottom: "20px", // stays lower
          right: "50px",
          zIndex: 1000,
          width: "60px",
          height: "60px",
        }}
      >
        <BiSolidImageAdd size={24} />
      </button>

      {photoView.state && <PhotoView />}

      {photoFormState && !shareListFormState && <PhotoForm albumId={albumId} />}
      {!photoFormState && shareListFormState && (
        <ShareAlbumForm albumId={albumId} />
      )}
      {photos.length === 0 && fetchImageState !== "loading" ? (
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ height: "90vh" }}
        >
          <h3>No Photos</h3>

          <p>Please Upload Photos</p>
        </div>
      ) : (
        <div className="container" style={{ marginTop: "40px" }}>
          <div className="row g-3">
            {photos.map((imgObj) => (
              <div
                className="col-6 col-sm-4 col-md-3 col-lg-2"
                key={imgObj._id}
              >
                <PhotoCard imageObj={imgObj} deleteBtnVisible={true} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumPhotos;
