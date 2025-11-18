import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import "../assets/photoView.css";
import {
  commentImage,
  deleteComment,
  getSharedImage,
  setPhotoView,
} from "../features/photo.slice";
import { MdDelete } from "react-icons/md";

const PhotoView = () => {
  const dispatch = useDispatch();
  const { photoView, commentDeleteState, commentImageState } = useSelector(
    (state) => state.photoState
  );
  const { user } = useSelector((state) => state.userState);

  const [commentInput, setCommentInput] = useState("");

  if (!photoView?.photo) return null;

  const { _id, imageUrl, comments } = photoView.photo;

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (commentInput.trim() === "") return;
    try {
      await dispatch(
        commentImage({ imageId: _id, comment: commentInput })
      ).unwrap();
      setCommentInput("");
    } catch (error) {
      console.log("error", error);
    }
  };

  const onClose = () => {
    dispatch(setPhotoView({ state: false, photo: {} }));
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment({ imageId: _id, commentId }));
  };

  useEffect(() => {
    if (window.location.pathname === "/") {
      // dispatch(getSharedImage());
    }
  }, []);

  return (
    <div className="photo-view-overlay">
      <div className="photo-view-container">
        {/* Close Button */}
        <button className="photo-view-close" onClick={onClose}>
          <IoClose size={28} />
        </button>

        {/* LEFT: Image */}
        <div className="photo-view-left">
          <img src={imageUrl} alt="photo" className="photo-view-img" />
        </div>

        {/* RIGHT: Comments */}
        <div className="photo-view-right">
          <h5 className="fw-bold mb-3">Comments</h5>

          <div className="comments-box">
            {comments?.length === 0 ? (
              <p className="text-muted">No comments yet.</p>
            ) : (
              comments.map((c, i) => (
                <div
                  key={c._id || i}
                  className="comment-item d-flex align-items-start justify-content-between p-2"
                >
                  {/* Left Side: Avatar + Text */}
                  <div className="d-flex align-items-start gap-2">
                    <img
                      src={c.user.picture}
                      alt="avatar"
                      className="comment-avatar rounded-circle"
                    />

                    <div className="comment-text">
                      <span className="comment-user fw-semibold">
                        {c.user.name}
                      </span>
                      <p className="comment-message mb-0">{c.comment}</p>
                    </div>
                  </div>

                  {/* Delete Button */}
                  {user._id == c.user._id && (
                    <button
                      disabled={commentDeleteState === "loading"}
                      className="delete-comment-btn"
                      onClick={() => handleDeleteComment(c._id)}
                    >
                      {commentDeleteState === "loading" ? (
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
              ))
            )}
          </div>

          {/* Add Comment */}
          <form onSubmit={handleAddComment} className="mt-3 d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Add a comment..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <button
              disabled={commentImageState === "loading"}
              className="btn btn-primary"
            >
              {commentImageState === "loading" ? (
                <div
                  class="spinner-border text-light spinner-border-sm"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                "ADD"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PhotoView;
