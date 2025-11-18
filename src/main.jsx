import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./app/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import ProtectedRoute from "./Component/ProtectedRoute.jsx";
import LoginProtectedRoute from "./Component/LoginProtectedRoute.jsx";
import AlbumPhotos from "./Component/AlbumPhotos.jsx";
import Albums from "./Component/Albums.jsx";
import Favorite from "./Component/Favorite.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },

      {
        path: "albums", // NOT "/"
        element: (
          <ProtectedRoute>
            <Albums />
          </ProtectedRoute>
        ),
      },
      {
        path: "favorite", // NOT "/"
        element: (
          <ProtectedRoute>
            <Favorite />
          </ProtectedRoute>
        ),
      },

      {
        path: "photos/:albumId", // NOT "/photos"
        element: (
          <ProtectedRoute>
            <AlbumPhotos />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "/login",
    element: (
      <LoginProtectedRoute>
        <Login />
      </LoginProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
