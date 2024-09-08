import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useConnections } from '../context/connectionContext'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const ConnectionChart = () => {
    const { connections } = useConnections()
    const monthlyCounts = connections.reduce((acc, conn) => {
      const month = new Date(conn.date).toLocaleString('default', { month: 'short' });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});
    const data = {
        labels: Object.keys(monthlyCounts),
        datasets: [
          {
            label: 'Number of Requests',
            data: Object.values(monthlyCounts),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };
  return (
    <div>
      <Bar data={data} />
    </div>
  )
}

export default ConnectionChart
