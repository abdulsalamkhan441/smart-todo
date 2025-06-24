import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import ReactMarkdown from 'react-markdown';

export default function TaskItem({ task, setTasks, tasks }) {
  const [showConfetti, setShowConfetti] = useState(false);

  const toggleComplete = () => {
    const updated = tasks.map((t) =>
      t.id === task.id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
    if (!task.completed) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  useEffect(() => {
    if (task.due) {
      const dueTime = new Date(task.due).getTime() - Date.now();
      if (dueTime > 0) {
        const timer = setTimeout(() => {
          new Notification(`Task due: ${task.text}`);
        }, dueTime);
        return () => clearTimeout(timer);
      }
    }
  }, [task.due]);

  return (
    <div
      className={`p-3 mb-2 rounded shadow border dark:border-gray-600 bg-gray-50 dark:bg-gray-800 transition-all ${task.completed ? 'opacity-50' : ''}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={task.completed} onChange={toggleComplete} />
          <span className="font-medium">{task.text}</span>
        </div>
        <small className="text-gray-400">Due: {task.due ? new Date(task.due).toLocaleString() : 'None'}</small>
      </div>
      {task.description && (
        <div className="mt-2 text-sm">
          <ReactMarkdown>{task.description}</ReactMarkdown>
        </div>
      )}
      {showConfetti && <Confetti recycle={false} numberOfPieces={150} />} 
    </div>
  );
}
