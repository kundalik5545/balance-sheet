"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CircleArrowDown,
  CircleArrowUp,
  DollarSign,
  Landmark,
  TrendingUp,
} from "lucide-react";
import InvestmentChart from "@/components/CommanComponets/InvestmentChart";
import QuickStatCard from "@/components/CommanComponets/QuickStatCard";
import DisplayBankAccount from "./_components/DisplayBankAccount";
import BankAccountTable from "./_components/BankAccountTable";
import AddBankForm from "./_components/AddBankForm";
import { BankAccountContext } from "./_components/BankAccountContext";
import { totalBankAccountBalance } from "@/actions/bankAccout";
import { toast } from "sonner";
import BankBarChart from "./_components/BarChart";
import { formatCurrencyINR } from "@/app/lib/currencyFormatter";

const BankAccountPage = () => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [bankBalance, setBankBalance] = useState();
  const [monthlyIncome, setMonthlyIncome] = useState();
  const [monthlyExpense, setMonthlyExpense] = useState();
  const [remainingBalance, setRemainingBalance] = useState();

  const fetchFinancialSummary = async () => {
    try {
      const response = await totalBankAccountBalance();
      console.log(response);

      if (response.success) {
        setBankBalance(formatCurrencyINR(response.totalBalanceThisMonth));
        setMonthlyIncome(formatCurrencyINR(response.totalIncomeThisMonth));
        setMonthlyExpense(formatCurrencyINR(response.totalExpenseThisMonth));
        // Calculate remaining balance and format for display
        const balance =
          response.totalIncomeThisMonth - response.totalExpenseThisMonth;
        setRemainingBalance(formatCurrencyINR(balance));

        return chartData;
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("An error occurred while fetching financial data.");
    }
  };

  useEffect(() => {
    fetchFinancialSummary();
  }, []);

  return (
    <BankAccountContext.Provider
      value={{
        open,
        setOpen,
        editData,
        setEditData,
        editMode,
        setEditMode,
        data,
        setData,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        // getBankAccounts,
      }}
    >
      <div>
        {/* Header Section  with add bank account button*/}
        <section className="flex items-center justify-between mb-2">
          <h2 className="flex items-center gradient-subTitle text-3xl space-x-3">
            <span className="bg-blue-100 rounded-full p-2 shadow-lg">
              <Landmark color="black" size={25} />
            </span>
            <span>Bank</span>
          </h2>
          <AddBankForm>
            <Button>Add Bank Account</Button>
          </AddBankForm>
        </section>

        <hr className="mb-2" />
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

        {/* Display account balance Chart 
        pie - for different accounts
        bar - for balance
        trend - for every month balance
        
        */}
        <section className="flex justify-between flex-wrap pl-3 pr-3 pb-1 md:pb-4 ">
          <BankBarChart
            bankBalance={bankBalance}
            Income={monthlyIncome}
            Expense={monthlyExpense}
            remainingBalance={remainingBalance}
          />
          <InvestmentChart />
        </section>

        {/* 
           1. Display All Accounts 
           2. Display account balance
           */}
        {/* Bank Account Lists */}
        <DisplayBankAccount
        // open={open}
        // setOpen={setOpen}
        // editMode={editMode}
        // setEditMode={setEditMode}
        // setEditData={setEditData}
        />
        {/* Bank Account Lists */}
        <section className="pt-5 pb-5 hidden">
          <BankAccountTable />
        </section>

        {/* Bank Balance */}
        <section></section>
      </div>
    </BankAccountContext.Provider>
  );
};

export default BankAccountPage;
