"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const InvestmentChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const [bankBalance, setBankBalance] = useState();
  const [monthlyIncome, setMonthlyIncome] = useState();
  const [monthlyExpense, setMonthlyExpense] = useState();
  const [remainingBalance, setRemainingBalance] = useState();

  //balance formatter in indian ruppes format
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });
  useEffect(() => {
    const fetchFinancialSummary = async () => {
      try {
        const response = await totalBankAccountBalance();
        if (response.success) {
          setBankBalance(formatter.format(response.totalBalanceThisMonth));
          setMonthlyIncome(formatter.format(response.totalIncomeThisMonth));
          setMonthlyExpense(formatter.format(response.totalExpenseThisMonth));
          // Calculate remaining balance and format for display
          const balance =
            response.totalIncomeThisMonth - response.totalExpenseThisMonth;
          setRemainingBalance(formatter.format(balance));
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("An error occurred while fetching financial data.");
      }
    };

    fetchFinancialSummary();
  }, []);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Destroy the existing chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create a new chart instance
    chartInstanceRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Total Balance", "Income", "Expense", "Income - Expense"],
        datasets: [
          {
            data: [
              bankBalance,
              monthlyIncome,
              monthlyExpense,
              remainingBalance,
            ],
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
            position: "right",
          },
        },
      },
    });

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div style={{ position: "relative", height: "400px", width: "400px" }}>
      <canvas id="investmentChart" ref={chartRef}></canvas>
    </div>
  );
};

export default InvestmentChart;
