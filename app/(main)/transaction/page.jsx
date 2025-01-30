"use client";

import { AuthGuard } from "@/app/lib/auth-guard";
import { FileChartColumn, Pencil, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTransaction } from "@/actions/transaction";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import clsx from "clsx";
import { formatCurrencyINR } from "@/app/lib/currencyFormatter";
import { Button } from "@/components/ui/button";
import BankBarChart from "../bank-account/_components/BarChart";

const TransactionPage = () => {
  const filterType = ["All", "Income", "Expense", "Transfer", "Investment"];
  const filterPeriod = ["Daily", "Weekly", "Monthly", "Yearly"];

  const [resultData, setResultData] = useState();
  const [updateData, setUpdateData] = useState(false);
  const [bankBalance, setBankBalance] = useState();
  const [monthlyIncome, setMonthlyIncome] = useState();
  const [monthlyExpense, setMonthlyExpense] = useState();
  const [remainingBalance, setRemainingBalance] = useState();

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
      <div>
        {/* Header Section */}
        <section className="flex items-center justify-between mb-2">
          <h2 className="flex items-center gradient-subTitle text-3xl space-x-3">
            <span className="bg-blue-100 rounded-full p-2 shadow-lg">
              <FileChartColumn color="black" size={25} />
            </span>
            <span>Transactions</span>
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

        {/* Chart section */}
        <section className="flex justify-between flex-wrap pl-3 pr-3 pb-1 md:pb-4 ">
          <BankBarChart
            bankBalance={bankBalance}
            Income={monthlyIncome}
            Expense={monthlyExpense}
            remainingBalance={remainingBalance}
          />
          <BankBarChart
            bankBalance={bankBalance}
            Income={monthlyIncome}
            Expense={monthlyExpense}
            remainingBalance={remainingBalance}
          />
        </section>

        {/* Display recent transaction */}
        <div className="flex items-center justify-between mb-2 border-b-2 pb-2">
          <h3 className="text-3xl gradient-subTitle"># Recent Transactions</h3>
          <Select className="bg-black">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={"All"} />
            </SelectTrigger>
            <SelectContent>
              {filterType.map((item, index) => {
                return (
                  <SelectItem key={index} value={item}>
                    {item}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
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

export default TransactionPage;
