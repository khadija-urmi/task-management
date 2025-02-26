import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import SignUp from "../pages/SignUp";
import Tasks from "../pages/Tasks";
import EditTask from "../pages/EditTask";
import HandleTask from "../pages/HandleTask";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <SignUp />,
      },
      {
        path: "/tasks",
        element: <Tasks />,
      },
      {
        path: "/handle-task",
        element: <HandleTask />,
      },
      {
        path: "/edit-task/:id",
        element: <EditTask />,
      },
    ],
  },
]);

export default router;
