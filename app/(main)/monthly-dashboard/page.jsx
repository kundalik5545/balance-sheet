"use client";

import React, { useEffect, useState } from "react";
import AddNameForm from "./_components/AddNameForm";
import { Button } from "@/components/ui/button";
import {
  CircleArrowDown,
  CircleArrowUp,
  DollarSign,
  FileChartColumn,
  Landmark,
  Pencil,
  Trash,
  TrendingUp,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { AuthGuard } from "@/app/lib/auth-guard";
import QuickStatCard from "@/components/CommanComponets/QuickStatCard";
import BankBarChart from "../bank-account/_components/BarChart";
import { getTransaction } from "@/actions/transaction";
import clsx from "clsx";
import { formatCurrencyINR } from "@/app/lib/currencyFormatter";
import { Progress } from "@/components/ui/progress";
import { expenseTrans, incomeTrans } from "@/data/Categories";
import ExpensePieChartComponent from "./_components/ExpensePieChart";
import IncomePieChartComponent from "./_components/IncomePieChart";

const MonthlyBudget = () => {
  const [resultData, setResultData] = useState();
  const [updateData, setUpdateData] = useState(false);
  const [bankBalance, setBankBalance] = useState();
  const [monthlyIncome, setMonthlyIncome] = useState();
  const [monthlyExpense, setMonthlyExpense] = useState();
  const [remainingBalance, setRemainingBalance] = useState();

  const filterPeriod = ["Daily", "Weekly", "Monthly", "Yearly"];

  const transactionStatusColors = {
    COMPLETED: "bg-blue-50 text-blue-500",
    PENDING: "bg-yellow-50 text-yellow-500",
    EXPIRED: "bg-red-50 text-red-500",
  };

  const transactionTypeColors = {
    INCOME: "bg-blue-50 text-blue-500",
    TRANSFER: "bg-purple-50 text-purple-500",
    INVESTMENT: "bg-pink-50 text-pink-500",
    EXPENSE: "bg-red-50 text-red-500",
  };
  const transactionAmountColors = {
    INCOME: "text-blue-500",
    TRANSFER: "text-purple-500",
    INVESTMENT: "text-pink-500",
    EXPENSE: "text-red-500",
  };

  const getUserDetail = async () => {
    const response = await getTransaction();
    if (response.success) {
      setResultData(response.data);
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    if (updateData) {
      getUserDetail();
      setUpdateData(false);
    }
    getUserDetail();
  }, [updateData]);

  return (
    <AuthGuard>
      <div className="container mx-auto p-2 md:p-3 pt-4 md:pt-0  ">
        {/* Header Section */}
        <section className="flex items-center justify-between mb-2">
          <h2 className="flex items-center gradient-subTitle text-3xl space-x-3">
            <span className="bg-blue-100 rounded-full p-2 shadow-lg">
              <FileChartColumn color="black" size={25} />
            </span>
            <span>Monthly Dashboard</span>
          </h2>
          <Select className="bg-black">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={"Monthly"} />
            </SelectTrigger>
            <SelectContent>
              {filterPeriod.map((item, index) => {
                return (
                  <SelectItem key={index} value={item}>
                    {item}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </section>
        <hr className="mb-2" />
        {/* Quick Stats section */}
        {/* Quick Stats card - 4 cards
        1. Total balance
        2. MOnthly Income
        3. Monthly Expense
        4. Saving/ Investments
        */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pl-3 pr-3 pb-1 md:pb-4">
          <QuickStatCard
            topTitle={"Total Balance"}
            MainAmt={bankBalance}
            iconName={<DollarSign />}
            statsChange={"+3.4% Increase from last month."}
            statTextColor={"text-green-500"}
            bgColor={"bg-green-200"}
          />
          <QuickStatCard
            topTitle={"Monthly Income"}
            MainAmt={monthlyIncome}
            iconName={<CircleArrowUp color="blue" />}
            statsChange={"+3.4% Increase from last month."}
            statTextColor={"text-blue-500"}
            bgColor={"bg-blue-200"}
          />
          <QuickStatCard
            topTitle={"Monthly Expense"}
            MainAmt={monthlyExpense}
            iconName={<CircleArrowDown color="red" />}
            statsChange={"+3.4% Increase from last month."}
            statTextColor={"text-red-500"}
            bgColor={"bg-red-200"}
          />
          <QuickStatCard
            topTitle={"Income - Expense"}
            MainAmt={remainingBalance}
            iconName={<TrendingUp />}
            statsChange={"+3.4% Increase from last month."}
            statTextColor={"text-purple-500"}
            bgColor={"bg-purple-200"}
          />
        </section>

        {/* Chart sections */}
        <section className="flex justify-between flex-wrap pl-3 pr-3 pb-1 md:pb-4 ">
          <h3 className="text-3xl gradient-subTitle">#Income</h3>
          <IncomePieChartComponent />
        </section>
        <hr className="mb-2" />
        <section className="flex justify-between flex-wrap pl-3 pr-3 pb-1 md:pb-4 ">
          <h3 className="text-3xl gradient-subTitle">#Expense</h3>
          <ExpensePieChartComponent />
        </section>

        {/* /* Expense Transaction with category and percentage of total transaction
        for the selected period */}
        <div className="mb-2">
          <h3 className="text-3xl gradient-subTitle mt-6">
            # Expense Transaction
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {/* Expense */}
            <section className="w-full md:w-[calc(50%-6px)]">
              <Table className="mt-4">
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="py-2">Expense Category</TableHead>
                    <TableHead className="py-2 text-right">Amount</TableHead>
                    <TableHead className="py-2 text-right">
                      Percentage
                    </TableHead>
                    <TableHead className="py-2">Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenseTrans.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell>{data.category}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrencyINR(data.amount)}
                      </TableCell>
                      <TableCell className="text-right">
                        {data.percentage}%
                      </TableCell>
                      <TableCell>
                        <Progress value={data.progress} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={1}>Total</TableCell>
                    <TableCell className="text-right">
                      {formatCurrencyINR(23450)}
                    </TableCell>
                    <TableCell colSpan={1} className="text-right">
                      100.00%
                    </TableCell>
                    <TableCell colSpan={1} className="text-right"></TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </section>

            {/* Income */}
            <section className="w-full md:w-[calc(50%-6px)]">
              <Table className="mt-4">
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="py-2">Income Category</TableHead>
                    <TableHead className="py-2 text-right">Amount</TableHead>
                    <TableHead className="py-2 text-right">
                      Percentage
                    </TableHead>
                    <TableHead className="py-2">Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incomeTrans.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell>{data.category}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrencyINR(data.amount)}
                      </TableCell>
                      <TableCell className="text-right">
                        {data.percentage}%
                      </TableCell>
                      <TableCell>
                        <Progress value={data.progress} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={1}>Total</TableCell>
                    <TableCell className="text-right">
                      {formatCurrencyINR(73450)}
                    </TableCell>
                    <TableCell colSpan={1} className="text-right">
                      100.00%
                    </TableCell>
                    <TableCell colSpan={1} className="text-right"></TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </section>
          </div>
        </div>

        {/* Display recent transaction table */}
        <h3 className="text-3xl gradient-subTitle"># Recent Transactions</h3>
        <section>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Sr. No</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resultData?.allTransactions?.length > 0 &&
                resultData.allTransactions.map((data, index) => {
                  return (
                    <TableRow key={data.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {new Date(data.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{data.description}</TableCell>
                      <TableCell>
                        <span
                          className={clsx(
                            transactionTypeColors[data.type],
                            "px-2 py-1 text-xs font-medium rounded-full"
                          )}
                        >
                          {data.type.toLowerCase().charAt(0).toUpperCase() +
                            data.type.slice(1).toLowerCase()}
                        </span>
                      </TableCell>
                      <TableCell>
                        {data.category.charAt(0).toUpperCase() +
                          data.category.slice(1).toLowerCase()}
                      </TableCell>
                      <TableCell>
                        <span
                          className={clsx(
                            transactionAmountColors[data.type],
                            "text-sm font-medium"
                          )}
                        >
                          {data.type === "EXPENSE" ? "-" : "+"}
                          {formatCurrencyINR(data.amount)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={clsx(
                            transactionStatusColors[data.status],
                            "px-2 py-1 text-xs font-medium rounded-full"
                          )}
                        >
                          {data.status.charAt(0).toUpperCase() +
                            data.status.slice(1).toLowerCase()}
                        </span>
                      </TableCell>
                      <TableCell className="flex">
                        <Button variant="ghost" className="p-0">
                          <Pencil color="blue" />
                        </Button>
                        <Button variant="ghost">
                          <Trash color="red" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </section>
      </div>
    </AuthGuard>
  );
};

export default MonthlyBudget;
