import TaskListCard from "./TaskListCard";

const Column = ({ column, tasks }) => {
  return (
    <div className="flex w-80 rounded-lg bg-neutral-800 p-4">
      <h2 className="mb-4 font-semibold text-neutral-100">{column.title}</h2>
      <div className="flex flex-1 flex-col gap-4">
        {tasks.map((task) => {
          return <TaskListCard key={task.id} task={task}></TaskListCard>;
        })}
      </div>
    </div>
  );
};

export default Column;
