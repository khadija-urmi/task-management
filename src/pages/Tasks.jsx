import { useState } from "react";
import Column from "../components/Column";
import { DndContext } from "@dnd-kit/core";

const Tasks = () => {
  const INITIAL_TASKS = [
    {
      id: "1",
      title: "Research Project",
      description: "Gather requirements and create initial documentation",
      status: "TODO",
    },
    {
      id: "2",
      title: "Design System",
      description: "Create component library and design tokens",
      status: "TODO",
    },
    {
      id: "3",
      title: "API Integration",
      description: "Implement REST API endpoints",
      status: "PROGRESS",
    },
    {
      id: "4",
      title: "Testing",
      description: "Write unit tests for core functionality",
      status: "DONE",
    },
  ];
  const COLUMNS = [
    { id: "TODO", title: "To Do" },
    { id: "PROGRESS", title: "In Progress" },
    { id: "DONE", title: "Done" },
  ];
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const handleDragEndTask = async (event) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    setTasks(() =>
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...tasks,
              status: newStatus,
            }
          : task
      )
    );
  };

  return (
    <div className="p-4 mt-16">
      <div className="flex gap-8 mt-3">
        <DndContext onDragEnd={handleDragEndTask}>
          {COLUMNS.map((column) => {
            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.status === column.id)}
              />
            );
          })}
        </DndContext>
      </div>
    </div>
  );
};

export default Tasks;
