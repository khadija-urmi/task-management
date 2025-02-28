import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      setError("Both title and description are required.");
      return;
    }
    try {
      await axios.put(
        `https://my-task-manager-app-server-qrei9nycc-khadija-urmis-projects.vercel.app/tasks/${id}`,
        {
          title,
          description,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Task Updated!",
        text: "The task has been successfully updated.",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/handle-task");
    } catch (err) {
      console.error(err);
      setError("Failed to update the task.");
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error updating the task.",
      });
    }
  };

  return (
    <div className="mt-20 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h1 className="text-3xl font-semibold text-center mb-6">Edit Task</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-lg font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTask;
