import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "./layout/BasicLayout";
import NotFoundPage from "./pages/error/NotFound";
import MainPage from "./pages/index";
import Upload from "./pages/upload/UploadPage";

const router = createBrowserRouter([
  {
    path: "/", // Add path here for BasicLayout
    element: <BasicLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true, // Use index to define the default child route
        element: <MainPage />,
      },
      {
        path: "upload", // Move the signin route under the layout
        element: <Upload />,
      }
    ],
  },
  {
    path: "*", // Catch-all for undefined routes
    element: <NotFoundPage />,
  },
]);

export default router;