import { useDroppable } from "@dnd-kit/core"; // Import useDroppable
import TaskListCard from "./TaskListCard"; // Import the TaskCard component

const Column = ({ column, tasks }) => {
  const { setNodeRef } = useDroppable({
    id: column.id, // Make this column droppable
  });

  return (
    <div ref={setNodeRef} className="flex w-80 rounded-lg bg-neutral-800 p-4">
      <h2 className="mb-4 font-semibold text-neutral-100">{column.title}</h2>
      <div className="flex flex-1 flex-col gap-4">
        {tasks.map((task) => (
          <TaskListCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
