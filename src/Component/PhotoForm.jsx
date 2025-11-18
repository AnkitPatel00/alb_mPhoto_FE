import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { photoFormStateControll, uploadImage } from "../features/photo.slice";
import imageCompression from "browser-image-compression";

const PhotoForm = ({ albumId }) => {
  const [imageInput, setImageInput] = useState(null);
  const [imageCompressMessage, setImageCompressMessage] = useState(false);
  const [imageInputPreview, setImageInputPreview] = useState(null);
  const [imageData, setImageData] = useState({
    name: "",
    size: "",
    albumId,
    tags: [],
  });

  const dispatch = useDispatch();

  const { uploadState } = useSelector((state) => state.photoState);

  const handleImageInput = (e) => {
    const imageObj = e.target.files[0];
    if (imageObj) {
      setImageInput(imageObj);
      setImageInputPreview(URL.createObjectURL(imageObj));
      setImageData((prev) => ({ ...prev, size: imageObj.size }));
      if (imageData.name === "") {
        setImageData((prev) => ({ ...prev, name: imageObj.name }));
      }
    }
  };

  const handleImageData = (e) => {
    const { name, value } = e.target;
    setImageData((prev) => ({
      ...prev,
      [name]: name == "tags" ? value.split(",") : value,
    }));
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const options = {
      maxSizeMB: 0.15,
      useWebWorker: true,
    };

    try {
      if (!imageInput) {
        alert("Please select an image first!");
        return;
      }

      if (!imageData.name.trim()) {
        alert("Please enter image name!");
        return;
      }
      setImageCompressMessage(true);
      const compressedImage = await imageCompression(imageInput, options);
      setImageCompressMessage(false);
      const formData = new FormData();
      formData.append("image", compressedImage);
      formData.append("name", imageData.name);
      formData.append("size", imageData.size);
      formData.append("albumId", albumId);
      formData.append("tags", imageData.tags);
      if (albumId && imageInput && imageData.name) {
        dispatch(uploadImage(formData));
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const onClose = () => {
    dispatch(photoFormStateControll(false));
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75 p-3"
      style={{ zIndex: 1050 }}
    >
      <div
        className="card shadow-lg border-0 rounded-4 position-relative p-4"
        style={{ width: "420px" }}
      >
        {/* Close Button */}
        <button
          disabled={uploadState === "loading" || imageCompressMessage}
          type="button"
          className="btn-close position-absolute top-0 end-0 m-3"
          aria-label="Close"
          onClick={onClose}
        ></button>

        <h4 className="text-center mb-4 fw-bold text-primary">Upload Image</h4>

        <form onSubmit={handleUpload}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Image Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter image name"
              value={imageData.name}
              onChange={handleImageData}
            />
          </div>

          {/* File Upload */}
          <div className="mb-3">
            <label className="form-label">Select Image</label>
            <input
              accept=".png, .jpg, .jpeg"
              type="file"
              className="form-control"
              onChange={handleImageInput}
            />
          </div>

          <div>
            {/* Image Preview */}
            {imageInputPreview && (
              <div className="mb-3 text-center">
                <div
                  className="rounded-4 shadow-sm mx-auto mb-2 overflow-hidden border"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    background: "#f3f3f3",
                  }}
                >
                  <img
                    src={imageInputPreview}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <small className="text-secondary">Preview</small>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="mb-3">
            <label className="form-label">Tags (optional)</label>
            <input
              type="text"
              className="form-control"
              placeholder="Trip,Mount,River,Buildings"
              value={imageData.tags.join(",")}
              name="tags"
              onChange={handleImageData}
            />
          </div>

          {/* Submit */}
          <button
            disabled={uploadState === "loading" || imageCompressMessage}
            type="submit"
            className="btn btn-primary w-100"
          >
            {uploadState === "loading" ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span>Uploading image...</span>
                <div class="spinner-border text-light" role="status"></div>
              </div>
            ) : imageCompressMessage ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span>Compressing image...</span>
                <div class="spinner-grow text-light" role="status"></div>
              </div>
            ) : (
              "Upload"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PhotoForm;
