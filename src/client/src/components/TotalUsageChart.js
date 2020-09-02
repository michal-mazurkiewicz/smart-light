import React from "react";
import {
  CartesianGrid,
  YAxis,
  ReferenceLine,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  linearGradient,
} from "recharts";

export default function TotalUsageChart(props) {
  return (
    <div className="chart">
      <div style={{ padding: "10px" }}>
        <h5>Total Usage:</h5>
        <AreaChart
          width={800}
          height={350}
          data={props.illuminanceData}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="15%" stopColor="#FEDEB1" stopOpacity={0.95} />
              <stop offset="95%" stopColor="#FEDEB1" stopOpacity={0.5} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis
            ticks={[50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600]}
            stroke="black"
          />
          <Area
            type="monotone"
            dataKey="illuminance"
            stroke="#FEDEB1"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="power"
            stroke="#FDB4A8"
            fill="#FDB4A8"
          />
          <ReferenceLine y={props.target} stroke="green" />
          <Legend />
          <Tooltip />
        </AreaChart>
      </div>
    </div>
  );
}
