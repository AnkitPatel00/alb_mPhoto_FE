import { useEffect, useMemo, useState } from "react";
import "../assets/shareAlbumForm.css";
import { useDispatch, useSelector } from "react-redux";
import { shareListFormStateControll } from "../features/photo.slice";
import { getAlbum, removeEmail, shareAlbum } from "../features/album.slice";
import { MdDelete } from "react-icons/md";

const ShareAlbumForm = ({ albumId }) => {
  const [emailInput, setEmailInput] = useState("");
  // const [emailList, setEmailList] = useState([]);

  const dispatch = useDispatch();

  const { shareAlbumState, albums, removeEmailState } = useSelector(
    (state) => state.albumState
  );
  const { user } = useSelector((state) => state.userState);

  const onClose = () => {
    dispatch(shareListFormStateControll(false));
  };

  const handleAddEmail = async (e) => {
    e.preventDefault();

    if (!emailInput.trim()) return;

    try {
      await dispatch(shareAlbum({ email: emailInput, albumId })).unwrap();
      setEmailInput(""); // reset on success
    } catch (error) {
      console.log("Failed to share:", error);
    }
  };

  useEffect(() => {
    dispatch(getAlbum());
  }, []);

  const album = albums?.find(({ _id }) => _id == albumId);

  const handleDeleteEmail = (email) => {
    dispatch(removeEmail({ email, albumId }));
  };

  return (
    <div className="share-modal-overlay">
      <div className="share-modal-card position-relative">
        {/* Close Button */}
        <button
          className="btn-close position-absolute top-0 end-0 m-3"
          onClick={onClose}
        ></button>

        <h4 className="text-center fw-bold mb-3 text-primary">Share Album</h4>

        {/* Email Input */}
        <form className="mb-3 d-flex gap-2" onSubmit={handleAddEmail}>
          <input
            value={emailInput}
            type="email"
            name="email"
            placeholder="Email@domain.com"
            className="form-control"
            required
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <button
            disabled={shareAlbumState === "loading"}
            className="btn btn-primary"
          >
            {shareAlbumState === "loading" ? (
              <div
                class="spinner-border text-light spinner-border-sm"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Add"
            )}
          </button>
        </form>

        {/* Scrollable Email List */}
        <div className="email-list-box">
          <ul className="list-unstyled mb-0">
            {album?.sharedWith?.toReversed().map((email, idx) => (
              <li key={email} className="email-item">
                {email}{" "}
                {email !== user.email && (
                  <button
                    disabled={removeEmailState === "loading"}
                    className="delete-Btn"
                    onClick={() => handleDeleteEmail(email)}
                  >
                    {removeEmailState === "loading" ? (
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
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShareAlbumForm;
