import React from "react";
import {
  BarChart,
  CartesianGrid,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  linearGradient,
  XAxis,
} from "recharts";

export default function UsageChart(props) {
  return (
    <div className="data">
      <div style={{ padding: "5px" }}>
        <h5>Usage by light:</h5>
        <BarChart
          width={800}
          height={350}
          margin={{
            top: 5,
            right: 20,
            left: 0,
            bottom: 5,
          }}
          data={props.lightData}
        >
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#ff816e" stopOpacity={0.95} />
              <stop offset="90%" stopColor="#FEDEB1" stopOpacity={1} />
            </linearGradient>
            <linearGradient id="colorTop" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#ffcf6e" stopOpacity={0.95} />
              <stop offset="95%" stopColor="#FEDEB1" stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="black" />
          <YAxis stroke="black" />
          <Legend />
          <Tooltip />
          <Bar dataKey="bottom" fillOpacity={1} fill="url(#colorPv)" />
          <Bar dataKey="top" fillOpacity={1} fill="url(#colorTop)" />
        </BarChart>
      </div>
    </div>
  );
}
