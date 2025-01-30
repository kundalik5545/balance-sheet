// components/PieChartComponent.js
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Data from expenseTrans
const data = [
  { name: "💰 Salary", value: 50000, percentage: 50, progress: 50 },
  { name: "💼 Freelance", value: 20000, percentage: 20, progress: 20 },
  { name: "🏦 Loan", value: 10000, percentage: 10, progress: 10 },
  { name: "🎁 Gift", value: 5000, percentage: 5, progress: 5 },
  { name: "📈 Passive Income", value: 8000, percentage: 8, progress: 8 },
  { name: "💹 Interest Earn", value: 3000, percentage: 3, progress: 3 },
  { name: "💸 Profit", value: 7000, percentage: 7, progress: 7 },
  { name: "📦 Others", value: 2000, percentage: 2, progress: 2 },
  { name: "👨‍👩‍👧‍👦 Family", value: 5000, percentage: 5, progress: 5 },
];

// Color palette for the pie chart
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF6666",
  "#66FF66",
  "#6666FF",
  "#FF66FF",
  "#66FFFF",
  "#FFCC99",
  "#99CCFF",
  "#CC99FF",
  "#FF9999",
  "#99FF99",
];

const IncomePieChartComponent = () => {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(2)}%)`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name, props) => [
              `${name}: ${value}`,
              `Percentage: ${((props.payload.percent || 0) * 100).toFixed(2)}%`,
            ]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomePieChartComponent;
