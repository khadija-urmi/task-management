import { useDraggable } from "@dnd-kit/core";
import { MdDelete, MdEditDocument } from "react-icons/md";

const TaskListCard = ({ task, refetch }) => {
  console.log("task", task);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="cursor-grab rounded-lg bg-neutral-700 p-4 shadow-sm hover:shadow-md mt-4"
    >
      <h3 className="font-medium text-neutral-100">{task.title}</h3>
      <p className="mt-2 text-sm text-neutral-400">{task.description}</p>
      <div className="flex justify-end space-x-3 mt-2">
        <button className="text-purple-400 hover:text-purple-600 focus:outline-none">
          <MdEditDocument className="w-5 h-5" />
        </button>
        <button className="text-red-500 hover:text-red-600 focus:outline-none">
          <MdDelete className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TaskListCard;
