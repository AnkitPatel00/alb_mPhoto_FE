import { useDispatch, useSelector } from "react-redux";
import {
  albumFormControll,
  createAlbum,
  getAlbum,
} from "../features/album.slice";
import { checkToken } from "../features/user.slice";
import AlbumForm from "./AlbumForm";
import { useEffect } from "react";
import AlbumsCard from "./AlbumsCard";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import Loading from "./Loading";

const Albums = () => {
  const dispatch = useDispatch();

  const { albums, albumFetchState, albumFormState } = useSelector(
    (state) => state.albumState
  );

  const handleCreateAlbum = () => {
    dispatch(albumFormControll(true));
  };

  useEffect(() => {
    dispatch(getAlbum());
  }, []);

  if (albumFetchState === "loading") {
    return <Loading />;
  }
  return (
    <div className="position-relative min-vh-100 bg-dark text-light">
      {/* Top-right button */}
      <button
        onClick={handleCreateAlbum}
        className="btn btn-primary position-fixed bottom-0 end-0 m-4 rounded-circle shadow-lg"
        style={{ zIndex: 2000, width: "60px", height: "60px" }}
      >
        <MdOutlineCreateNewFolder />
      </button>

      {/* Main content area */}
      <div className="container py-5">
        {albums.length === 0 && albumFetchState !== "loading" ? (
          <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ height: "90vh" }}
          >
            <h3>No Album</h3>

            <p>Please Create Album</p>
          </div>
        ) : (
          <div className="row g-4">
            {albums.map(({ _id, name, description }, i) => (
              <AlbumsCard
                id={_id}
                name={name}
                description={description}
                key={_id || i}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating create form */}
      {albumFormState && <AlbumForm />}
    </div>
  );
};

export default Albums;
