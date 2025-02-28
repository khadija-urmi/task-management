import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HandleTask = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    data: taskList = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["taskList", currentUser],
    queryFn: async () => {
      const res = await axios.get(
        `https://my-task-manager-app-server-qrei9nycc-khadija-urmis-projects.vercel.app/tasks/${currentUser.email}`
      );
      return res.data;
    },
  });

  const handleDeleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `https://my-task-manager-app-server-qrei9nycc-khadija-urmis-projects.vercel.app/tasks/${id}`
      );
      console.log("response of delete", response);

      Swal.fire({
        icon: "success",
        title: "Task Deleted!",
        text: "The task has been successfully deleted.",
        timer: 1500,
        showConfirmButton: false,
      });

      refetch();
    } catch (error) {
      console.error("Error deleting task:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error deleting the task.",
      });
    }
  };

  const handleEditTask = (id) => {
    console.log(id);
    navigate(`/edit-task/${id}`);
  };

  return (
    <div className="mt-20">
      <h3 className="text-xl font-semibold mb-4">Your Tasks</h3>
      {isLoading ? (
        <p>Loading...</p>
      ) : taskList.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {taskList.map((task) => (
            <div
              key={task._id}
              className="p-4 bg-neutral-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <h4 className="text-lg font-medium text-neutral-100">
                {task.title}
              </h4>
              <p className="mt-2 text-sm text-neutral-400">
                {task.description}
              </p>
              <div className="mt-4 flex justify-between">
                <span className="text-xs text-gray-400">{task.status}</span>

                <button
                  onClick={() => handleEditTask(task._id)}
                  className="text-blue-500 hover:text-blue-700 text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="text-red-500 hover:text-red-700 text-xs"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HandleTask;
