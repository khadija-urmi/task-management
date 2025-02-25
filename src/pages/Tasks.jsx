import { useState } from "react";

const Tasks = () => {
  const [tasks, setTasks] = useState();
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "To-Do",
  });

  return (
    <div className="w-10/12 mx-auto mt-20">
      <div className="flex space-x-4">
        <input
          type="text"
          value={newTask.title}
          placeholder="Task Title"
          className="p-2 border border-gray-300 rounded w-1/3"
          maxLength="50"
        />
        <input
          type="text"
          value={newTask.description}
          placeholder="Description (optional)"
          className="p-2 border border-gray-300 rounded w-2/3"
          maxLength="150"
        />
        <select
          value={newTask.category}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button className="p-3 bg-blue-500 text-white rounded">Add Task</button>
      </div>
    </div>
  );
};

export default Tasks;
