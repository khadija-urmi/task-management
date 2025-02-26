import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import SignUp from "../pages/SignUp";
import Tasks from "../pages/Tasks";
import EditTask from "../pages/EditTask";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <SignUp></SignUp>,
      },
      {
        path: "/task",
        element: <Tasks></Tasks>,
      },
      {
        path: "/edit-task/:id",
        element: <EditTask></EditTask>,
      },
    ],
  },
]);

export default router;
