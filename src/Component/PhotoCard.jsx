import { useDispatch, useSelector } from "react-redux";
import "../assets/photoCard.css";
import { deleteImage, setPhotoView } from "../features/photo.slice";
import { MdDelete } from "react-icons/md";
import { useState } from "react";

const PhotoCard = ({ imageObj, deleteBtnVisible }) => {
  const dispatch = useDispatch();
  const [deleteBtnId, setDeleteBtnId] = useState(null);

  const { deleteImageState } = useSelector((state) => state.photoState);

  const handleDeleteImage = async () => {
    try {
      setDeleteBtnId(imageObj._id);
      await dispatch(deleteImage(imageObj._id)).unwrap();
      setDeleteBtnId(null);
    } catch (error) {
      console.log(error);
      setDeleteBtnId(null);
    }
  };

  const handlePhotoView = (imgObj) => {
    dispatch(setPhotoView({ state: true, photo: imgObj }));
  };

  return (
    <div className="photo-card position-relative">
      <div onClick={() => handlePhotoView(imageObj)}>
        <img src={imageObj.imageUrl} alt="photo" className="photo-img" />
      </div>

      {deleteBtnVisible && (
        <button
          disabled={deleteImageState === "loading"}
          className="delete-btn"
          onClick={handleDeleteImage}
        >
          {deleteBtnId === imageObj._id ? (
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
      )}
    </div>
  );
};

export default PhotoCard;
