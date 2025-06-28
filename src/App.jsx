import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import ThemeToggle from './components/ThemeToggle';
import Dashboard from './components/Dashboard';
import TaskStats from './components/TaskStats';
import TaskFilters from './components/TaskFilters';

const getInitialTheme = () => localStorage.getItem('theme') || 'light';
const getInitialTasks = () => {
  const saved = localStorage.getItem('tasks');
  return saved ? JSON.parse(saved) : [];
};

export default function App() {
  const [tasks, setTasks] = useState(getInitialTasks);
  const [theme, setTheme] = useState(getInitialTheme);
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'pending'

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  const updateTasks = (newTasks) => {
    setTasks(newTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <div className="min-h-screen transition-colors bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">🚀 Smart To-Do</h1>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>

        {/* Add Task Input */}
        <AddTask addTask={addTask} />

        {/* Task Statistics */}
        <TaskStats
          total={tasks.length}
          completed={completedCount}
          pending={pendingCount}
        />

        {/* Filters */}
        <TaskFilters current={filter} setFilter={setFilter} />

        {/* Task List */}
        <TaskList tasks={filteredTasks} setTasks={updateTasks} />

        {/* Chart Dashboard */}
        <Dashboard tasks={tasks} />
      </div>
    </div>
  );
}
