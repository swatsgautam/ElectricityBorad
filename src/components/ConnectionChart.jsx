import React, { useState,useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useConnections } from '../context/connectionContext';
import { formatDateFromExcelSerial } from '../Utils/DateUtils';
import { statusOptions } from '../Utils/options';

const ConnectionChart = () => {
  const { connections } = useConnections(); // Retrieve connections from context
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Helper function to group connections by month and filter by status
  const getMonthlyConnectionData = (status) => {
    const filteredConnections = connections.filter((con) =>
      status === 'All' ? true : con.Status === status
    );

    const monthlyData = {};

    filteredConnections.forEach((con) => {
      const date = new Date(formatDateFromExcelSerial(con['Date of Application']));
      const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' }); // Format: Mon YYYY

      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = 0;
      }
      monthlyData[monthYear] += 1;
    });

    // Ensure data is sorted by date (oldest to newest)
    return Object.keys(monthlyData)
      .sort((a, b) => new Date(a) - new Date(b))
      .map((monthYear) => ({
        monthYear,
        connections: monthlyData[monthYear],
      }));
  };

  const chartData = useMemo(() => getMonthlyConnectionData(selectedStatus), [selectedStatus, connections]);


  return (
    <div>
      <h2>Connection Requests by Month</h2>
      <div>
        <label htmlFor="status">Filter by Status: </label>
        <select
          id="status"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="All">All</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="monthYear" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="connections" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ConnectionChart
