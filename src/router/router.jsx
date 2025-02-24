import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import SignUp from "../pages/SignUp";
import Tasks from "../pages/Tasks";

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
    ],
  },
]);

export default router;
