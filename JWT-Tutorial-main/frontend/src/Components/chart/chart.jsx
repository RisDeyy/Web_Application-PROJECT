import React, { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function ChartComponent() {
  const [data, setData] = useState([]);
  const chart = useSelector((state) => state.revenue.chart);
  useEffect(() => {
   
    const groupedData = chart.reduce((acc, item) => {
      const date = parseISO(item.createdAt);
      const month = format(date, 'yyyy-MM');

      if (!acc[month]) {
        acc[month] = [];
      }

      acc[month].push(item);
      return acc;
    }, {});

   
    const chartData = Object.entries(groupedData).map(([month, values]) => {
      const totalRevenue = values.reduce((sum, item) => sum + item.revenue, 0);
      return { month, totalRevenue };
    });

    setData(chartData);
  }, []);

  return (
    <div>
      <h2>Monthly Revenue Chart</h2>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="totalRevenue" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
}

export default ChartComponent;