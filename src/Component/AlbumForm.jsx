import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { albumFormControll, createAlbum } from "../features/album.slice";

const AlbumForm = () => {
  const [formData, setFormData] = useState({ name: "", description: "" });

  const dispatch = useDispatch();

  const { albumCreateState } = useSelector((state) => state.albumState);

  const btnLoading = albumCreateState === "loading";

  const handleForm = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCreateForm = (e) => {
    e.preventDefault();
    if (formData.name) {
      dispatch(createAlbum(formData));
    }
  };

  const onClose = () => {
    dispatch(albumFormControll(false));
  };

  return (
    <>
      <div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75 p-3"
        style={{ zIndex: 1050 }}
      >
        <div
          className="card shadow-lg border-0 rounded-4 position-relative p-4"
          style={{ width: "400px" }}
        >
          {/* Close Button */}
          <button
            type="button"
            className="btn-close position-absolute top-0 end-0 m-3"
            aria-label="Close"
            onClick={onClose}
          ></button>

          <h4 className="text-center mb-4 fw-bold text-primary">
            Create Album
          </h4>

          <form onSubmit={handleCreateForm}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Album Name
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter album name"
                value={formData.name}
                onChange={handleForm}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description (optional)
              </label>
              <textarea
                type="text"
                id="description"
                className="form-control"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleForm}
              ></textarea>
            </div>

            <button
              disabled={btnLoading}
              type="submit"
              className="btn btn-primary w-100"
            >
              {btnLoading ? (
                <div class="spinner-border text-light" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Create"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AlbumForm;
