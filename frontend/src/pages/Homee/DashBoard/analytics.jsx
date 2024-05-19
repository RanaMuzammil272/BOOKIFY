import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, AreaChart, Area } from 'recharts';

export default function Analytics() {
  const data = [
    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
  ];

  return (
    <>
      <div className="mt-10 p-6 bg-white rounded-lg shadow-md mb-4">
        <h2 className="text-lg font-semibold mb-4">Sales Analytics</h2>
        <LineChart width={500} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
        </LineChart>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-md mb-4">
        <h2 className="text-lg font-semibold mb-4">User Engagement</h2>
        <BarChart width={500} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Tooltip />
          <Legend />
          <Bar dataKey="uv" fill="#8884d8" />
          <Bar dataKey="pv" fill="#82ca9d" />
        </BarChart>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-md mb-4">
        <h2 className="text-lg font-semibold mb-4">Website Traffic</h2>
        <AreaChart width={500} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="uv" fill="#8884d8" stroke="#8884d8" />
          <Area type="monotone" dataKey="pv" fill="#82ca9d" stroke="#82ca9d" />
        </AreaChart>
      </div>
    </>
  );
}