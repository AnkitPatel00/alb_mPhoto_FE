import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/user.slice";
import { NavLink } from "react-router-dom";
import { MdFavorite } from "react-icons/md";
import { HiPhoto } from "react-icons/hi2";
import { MdPhotoLibrary } from "react-icons/md";

const Header = () => {
  const { user, statusLogout } = useSelector((state) => state.userState);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav
      className="navbar navbar-expand-md bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          KaviosPix
        </NavLink>

        <ul className="navbar-nav me-auto">{/* Left side links */}</ul>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {/* Left side links */}

            <li className="nav-list">
              <NavLink className="nav-link" to="/">
                <HiPhoto />
                <span className="ms-2">Photos Feed</span>
              </NavLink>
            </li>

            <li className="nav-list">
              <NavLink className="nav-link" to="/albums">
                <MdPhotoLibrary />
                <span className="ms-2">My Albums</span>
              </NavLink>
            </li>

            <li className="nav-list">
              <NavLink className="nav-link" to="/favorite">
                <MdFavorite />
                <span className="ms-2">Favorites</span>
              </NavLink>
            </li>
          </ul>

          {/* Right side user info */}
          <div className="d-flex align-items-center gap-3">
            <img
              src={user.picture}
              alt={user.name || "user-image"}
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid white",
              }}
            />
            <span className="text-light fw-semibold">{user.name}</span>
            <button
              disabled={statusLogout === "loading"}
              onClick={handleLogout}
              className="btn btn-outline-danger btn-sm px-3 fw-semibold"
            >
              {statusLogout === "loading" ? (
                <div
                  class="spinner-border text-light spinner-border-sm"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Logout"
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
