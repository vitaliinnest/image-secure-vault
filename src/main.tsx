import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/index.css";
import App from "./components/App";
import ErrorMessage from "./components/ErrorMessage";
import RequireAuth from "./components/RequireAuth";
import UploadPhoto from "./components/UploadPhoto";
import HomePage from "./components/HomePage";
import ValidatePhoto from "./components/ValidatePhoto";
import UploadFinish from "./components/UploadFinish";
import Gallery from "./components/Gallery";
import PhotoMetadata from "./components/PhotoMetadata";
import Settings from "./components/Settings";

export interface LocationState {
  image: File;
  title: string;
}

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorMessage />,
      children: [
        {
          element: <RequireAuth />,
          children: [
            {
              path: "home",
              element: <HomePage />,
            },
            {
              path: "upload-photo",
              element: <UploadPhoto />,
            },
            {
              path: "ai-validation",
              element: <ValidatePhoto />,
            },
            {
              path: "upload-finish",
              element: <UploadFinish />,
            },
            {
              path: "photo/:cid",
              element: <PhotoMetadata />,
            },
            {
              path: "gallery",
              element: <Gallery />,
            },
            {
              path: "settings",
              element: <Settings />,
            },
          ],
        },
      ],
    },
  ],
  { basename: "/image-secure-vault" }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
