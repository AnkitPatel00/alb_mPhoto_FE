import { NavLink } from "react-router-dom";
import "../assets/albumCard.css";
import { useDispatch, useSelector } from "react-redux";
import { removeAlbum } from "../features/album.slice";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

const AlbumsCard = ({ id, name, description }) => {
  const [deleteBtnId, setDeleteBtnId] = useState(null);

  const dispatch = useDispatch();

  const { removeAlbumState } = useSelector((state) => state.albumState);

  const handleDeleteAlbum = async (albumId) => {
    try {
      setDeleteBtnId(albumId);
      await dispatch(removeAlbum(albumId)).unwrap();
      setDeleteBtnId(null);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="col-sm-12 col-sm-6 col-md-4 col-lg-3">
      <div className="album-card text-light p-3 h-100 d-flex flex-column justify-content-between position-relative">
        {/* Delete Button */}
        <button
          disabled={deleteBtnId == id}
          className="album-delete-btn"
          onClick={() => handleDeleteAlbum(id)}
        >
          {deleteBtnId == id ? (
            <div
              class="spinner-border text-light spinner-border-sm"
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
          ) : (
            <MdDelete />
          )}
        </button>

        <div>
          <h5 className="fw-bold mb-2">{name}</h5>
          <p className="small opacity-75 mb-0">
            {description || "No description"}
          </p>
        </div>

        <NavLink
          className="btn view-btn mt-3"
          state={name}
          to={`/photos/${id}`}
        >
          View Album
        </NavLink>
      </div>
    </div>
  );
};

export default AlbumsCard;
