const Column = ({ column, tasks }) => {
  return (
    <div className="column bg-gray-100 p-4 rounded-lg shadow-md">
      <h2>{column.title}</h2>
    </div>
  );
};

export default Column;
