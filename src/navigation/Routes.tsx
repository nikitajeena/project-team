import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages-layout/login";
import Home from "../pages-layout/home";
import ProtectedRoute from "./ProtectedRoute";
import CreateProject  from "../pages-layout/create-project/index";
import EditProject from "../pages-layout/edit-project";
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/add-project",
        element: <CreateProject />
      },
      {
        path: "/edit-project/:projectId",
        element: <EditProject />
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

export default router;
