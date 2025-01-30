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
  { name: "🏠 Housing", value: 15000 },
  { name: "🚗 Transportation", value: 3000 },
  { name: "🛒 Groceries", value: 5000 },
  { name: "💡 Utilities", value: 2500 },
  { name: "🎬 Entertainment", value: 2000 },
  { name: "🍔 Food", value: 4000 },
  { name: "🛍️ Shopping", value: 4000 },
  { name: "🏥 Healthcare", value: 3500 },
  { name: "📚 Education", value: 5000 },
  { name: "💇 Personal Care", value: 1500 },
  { name: "✈️ Travel", value: 7000 },
  { name: "🛡️ Insurance", value: 2000 },
  { name: "🎁 Gifts & Donations", value: 1500 },
  { name: "💳 Bills & Fees", value: 1000 },
  { name: "📦 Other Expenses", value: 1500 },
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

const ExpensePieChartComponent = () => {
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

export default ExpensePieChartComponent;
