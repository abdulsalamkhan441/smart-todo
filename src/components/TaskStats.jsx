const TaskStats = ({ total, completed, pending }) => {
  return (
    <div className="mb-4 text-sm text-gray-300">
      ✅ Completed: {completed} | 🕓 Pending: {pending} | 📦 Total: {total}
    </div>
  );
};

export default TaskStats;
