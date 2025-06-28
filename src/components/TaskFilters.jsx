const TaskFilters = ({ current, setFilter }) => {
  const filters = ['all', 'completed', 'pending'];
  return (
    <div className="flex gap-2 mb-4">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-3 py-1 rounded ${
            current === f
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default TaskFilters;
