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

export interface LocationState {
  image: File;
  title: string;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorMessage />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          {
            path: 'home',
            element: <HomePage />,
          },
          {
            path: 'upload-photo',
            element: <UploadPhoto />,
          },
          {
            path: 'ai-validation',
            element: <ValidatePhoto />
          },
          {
            path: 'upload-finish',
            element: <UploadFinish />,
          }
          // {
          //   path: 'gallery',
          //   element: <Gallery />,
          // },
          // {
          //   path: 'settings',
          //   element: <Settings />,
          // }
        ]
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
