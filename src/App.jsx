import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import ThemeToggle from './components/ThemeToggle';
import Dashboard from './components/Dashboard';

const getInitialTheme = () => localStorage.getItem('theme') || 'light';
const getInitialTasks = () => {
  const saved = localStorage.getItem('tasks');
  return saved ? JSON.parse(saved) : [];
};

export default function App() {
  const [tasks, setTasks] = useState(getInitialTasks);
  const [theme, setTheme] = useState(getInitialTheme);

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

  return (
    <div className="min-h-screen transition-colors bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">🚀 Smart To-Do</h1>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
        <AddTask addTask={addTask} />
        <TaskList tasks={tasks} setTasks={updateTasks} />
        <Dashboard tasks={tasks} />
      </div>
    </div>
  );
}
