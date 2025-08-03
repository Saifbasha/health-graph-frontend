import React from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
}from 'recharts';
export default function SugarGraph({data}) {
  return (
    <div style={{ width: '100%', height: 400 , backgroundColor: 'rgb(255,255,255)', padding: '10px', borderRadius:'10px' , boxShadow:"5px 5px 5px #000 , -5px -5px 5px #000"}}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="date" stroke="#333" />
          <YAxis stroke="#333" label={{ value: 'Sugar (mg/dL)', angle: -90, position: 'insideLeft' , fill: '#333' }} />
          <Tooltip contentStyle={{ backgroundColor: '#f9f9f9', border: '1px solid #ccc', color: '#333' }}
            labelStyle={{ color: '#333' }} />
          <Legend wrapperStyle={{ color: '#333' }} />
          <Line type="monotone" dataKey="beforeFood" stroke="#ff7300" name="Before Food" />
          <Line type="monotone" dataKey="afterFood" stroke="#387908" name="After Food" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
