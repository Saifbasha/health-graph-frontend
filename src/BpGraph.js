import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
}from 'recharts';

export default function BpGraph({myArray}) {
  const [data, setData] = useState([]);
  
    useEffect(() => {
      const sorted = [...myArray].sort((a, b) => new Date(a.date) - new Date(b.date));
      setData(sorted);
    }, [myArray]);
  return (
     <div style={{ width: '100%', height: 400 ,backgroundColor: 'rgb(255,255,255)', padding: '10px', borderRadius:'10px', boxShadow:"5px 5px 5px #000 , -5px -5px 5px #000" }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#333" />
          <YAxis label={{ value: 'BP (mmHg)', angle: -90, position: 'insideLeft' , fill: '#333' }}  stroke="#333" />
          <Tooltip contentStyle={{ backgroundColor: '#f9f9f9', border: '1px solid #ccc', color: '#333' }} 
            labelStyle={{ color: '#333' }} />
          <Legend  wrapperStyle={{ color: '#333' }}/>
          <Line type="monotone" dataKey="sys_pressure" stroke="#3f51b5" name="Systolic" />
          <Line type="monotone" dataKey="dia_pressure" stroke="#4caf50" name="Diastolic" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
