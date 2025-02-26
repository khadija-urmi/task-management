import { useContext, useState } from "react";
import Column from "../components/Column";
import { DndContext } from "@dnd-kit/core";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosPublic from "../hook/useAxiosPublic";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const Tasks = () => {
  const COLUMNS = [
    { id: "TODO", title: "To Do" },
    { id: "PROGRESS", title: "In Progress" },
    { id: "DONE", title: "Done" },
  ];

  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const {
    data: taskList = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["taskList", currentUser],
    queryFn: async () => {
      const res = await axiosPublic.get("/tasks");
      return res.data;
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  console.log(taskList);

  const handleDragEndTask = async (event) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    const updatedTasks = taskList.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );

    setTasks(updatedTasks);
    try {
      await axiosPublic.patch(`/tasks/${taskId}`, { status: newStatus });
      refetch();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      id: `${taskList.length + 1}`,
      title: formData.title,
      description: formData.description,
      status: "TODO",
      email: currentUser.email,
    };

    try {
      const result = await axiosPublic.post("/tasks", newTask);
      setTasks((prevTasks) => [...prevTasks, result.data]);
      refetch();
      Swal.fire({
        icon: "success",
        title: "Task Added!",
        text: "Your task has been successfully added.",
        timer: 1500,
        showConfirmButton: false,
      });

      setFormData({ title: "", description: "" });
      closeModal();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="p-4 mt-16">
      <button
        onClick={openModal}
        className="block text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-4"
        type="button"
      >
        Add Task
      </button>

      <div className="p-4 mt-6">
        <DndContext onDragEnd={handleDragEndTask}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COLUMNS.map((column) => (
              <Column
                key={column.id}
                column={column}
                tasks={taskList.filter((task) => task.status === column.id)}
                refetch={refetch}
              />
            ))}
          </div>
        </DndContext>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h2 className="text-3xl text-center">Add Task</h2>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <span className="sr-only">Close modal</span>
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-4 md:p-5">
                <form onSubmit={handleSubmit} className="space-y-4" action="#">
                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Task Name"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Task Details"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add task
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
