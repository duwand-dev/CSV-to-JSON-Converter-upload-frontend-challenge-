import { createBrowserRouter, Navigate } from "react-router-dom";
import BasicLayout from "./layout/BasicLayout";
import NotFoundPage from "./pages/error/NotFound";
import Upload from "./pages/upload/UploadPage";
import MrfListPage from "./pages/mrflist/MrfList";

const router = createBrowserRouter([
  {
    path: "/", // Add path here for BasicLayout
    element: <BasicLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/", // Use index to define the default child route
        element: <Navigate to={"/upload"} />,
      },
      {
        path: "upload", // Move the signin route under the layout
        element: <Upload />,
      },
      {
        path: "rmffiles", // Move the signin route under the layout
        element: <MrfListPage />,
      }
    ],
  },
  {
    path: "*", // Catch-all for undefined routes
    element: <NotFoundPage />,
  },
]);

export default router;