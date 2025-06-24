import React, { useState } from 'react';

export default function AddTask({ addTask }) {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [importance, setImportance] = useState('Medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      date: new Date().toISOString(),
      due: dueDate,
      importance,
      description: ''
    };

    addTask(newTask);
    setText('');
    setDueDate('');
    setImportance('Medium');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 grid gap-2 md:grid-cols-4 sm:grid-cols-2">
      <input
        className="p-2 border rounded dark:border-gray-600 bg-white text-black dark:bg-gray-700 dark:text-white"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add new task..."
      />
      <input
        type="date"
        className="p-2 border rounded dark:border-gray-600 bg-white text-black dark:bg-gray-700 dark:text-white"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <select
        className="p-2 border rounded dark:border-gray-600 bg-white text-black dark:bg-gray-700 dark:text-white"
        value={importance}
        onChange={(e) => setImportance(e.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
    </form>
  );
}
