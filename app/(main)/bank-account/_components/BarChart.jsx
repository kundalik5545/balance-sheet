"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const BankBarChart = ({ bankBalance, Income, Expense, remainingBalance }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // const chartData = [bankBalance.toNumber(), Income, Expense, remainingBalance];
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Total Balance", "Income", "Expense", "Remaining Balance"],
        datasets: [
          {
            label: "Financial Summary",
            data: [45654, 50125, 35234, 12345],
            backgroundColor: [
              "rgba(59, 130, 246, 0.5)",
              "rgba(16, 185, 129, 0.5)",
              "rgba(245, 158, 11, 0.5)",
              "rgba(139, 92, 246, 0.5)",
            ],
            borderColor: [
              "rgb(59, 130, 246)",
              "rgb(16, 185, 129)",
              "rgb(245, 158, 11)",
              "rgb(139, 92, 246)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            max: 100000,
            stepSize: 10000,
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div style={{ position: "relative", height: "400px", width: "600px" }}>
      <canvas id="investmentChart" ref={chartRef}></canvas>
    </div>
  );
};

export default BankBarChart;

// bankBalance, monthlyIncome, monthlyExpense, remainingBalance;
