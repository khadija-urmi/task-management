import { useDroppable } from "@dnd-kit/core";
import TaskListCard from "./TaskListCard";

const Column = ({ column, tasks }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div className="flex w-80 rounded-lg bg-neutral-800 p-4">
      <h2 className="mb-4 font-semibold text-neutral-100">{column.title}</h2>
      <div
        ref={setNodeRef}
        className={`flex flex-1 flex-col gap-4 ${
          isOver ? "ring-2 ring-blue-500" : ""
        }`}
      >
        {tasks.map((task) => (
          <TaskListCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
