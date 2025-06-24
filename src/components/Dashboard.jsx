import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard({ tasks }) {
  const countPerDay = tasks.reduce((acc, task) => {
    if (!task.completed) return acc;
    const day = new Date(task.date).toLocaleDateString();
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(countPerDay),
    datasets: [
      {
        label: 'Tasks Completed',
        data: Object.values(countPerDay),
        backgroundColor: 'rgba(59, 130, 246, 0.7)'
      }
    ]
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">Dashboard</h2>
      <Bar data={data} />
    </div>
  );
}

