"use client";

import InvestmentChart from "@/components/CommanComponets/InvestmentChart";
import QuickStatCard from "@/components/CommanComponets/QuickStatCard";
import AddBankForm from "@/components/Forms/AddBankForm";
import { Button } from "@/components/ui/button";
import {
  CircleArrowDown,
  CircleArrowUp,
  DollarSign,
  Landmark,
  TrendingUp,
  User,
} from "lucide-react";

import React from "react";
import DisplayBankAccount from "./_components/DisplayBankAccount";
import useFetch from "@/hooks/use-Fetch";
import {
  addBankAccount,
  fetchBankAccounts,
  getCacheBankAccounts,
} from "@/actions/banks";
import BankAccountTable from "./_components/BankAccountTable";

const BankAccountPage = () => {
  // Create Bank Account fn
  const {
    apiFun: createBankAccountFn,
    apiRes: createBank,
    loading: creatBankLoading,
    error: createBankError,
  } = useFetch(addBankAccount);

  // Fetch Bank Account fn
  const {
    apiFun: fetchBankAccountFn,
    apiRes: bankAccounts,
    error: bankAccountError,
    loading: bankAccountLoading,
  } = useFetch(getCacheBankAccounts);

  return (
    <div className="container mx-auto border p-4 max-w-7xl mt-8 shadow-sm rounded-md">
      {/* Header Section */}
      <section className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gradient-subTitle text-3xl space-x-3">
          <span className="bg-blue-100 rounded-full p-2 shadow-lg">
            <Landmark color="black" size={25} />
          </span>
          <span>Bank</span>
        </h2>
        <AddBankForm
          createBankAccountFn={createBankAccountFn}
          creatBankLoading={creatBankLoading}
          createBankError={createBankError}
          createBank={createBank}
        >
          <Button>Add Bank Account</Button>
        </AddBankForm>
      </section>

      {/* Quick Stats card - 4 cards
        1. Total balance
        2. MOnthly Income
        3. Monthly Expense
        4. Saving/ Investments
      */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <QuickStatCard
          topTitle={"Total Balance"}
          MainAmt={"85,450"}
          iconName={<DollarSign />}
          statsChange={"+3.4% Increase from last month."}
          statTextColor={"text-green-500"}
          bgColor={"bg-green-200"}
        />
        <QuickStatCard
          topTitle={"Monthly Income"}
          MainAmt={"75,450"}
          iconName={<CircleArrowUp color="blue" />}
          statsChange={"+3.4% Increase from last month."}
          statTextColor={"text-blue-500"}
          bgColor={"bg-blue-200"}
        />
        <QuickStatCard
          topTitle={"Monthly Expense"}
          MainAmt={"50,450"}
          iconName={<CircleArrowDown color="red" />}
          statsChange={"+3.4% Increase from last month."}
          statTextColor={"text-red-500"}
          bgColor={"bg-red-200"}
        />
        <QuickStatCard
          topTitle={"Total Balance"}
          MainAmt={"30,440"}
          iconName={<TrendingUp />}
          statsChange={"+3.4% Increase from last month."}
          statTextColor={"text-purple-500"}
          bgColor={"bg-purple-200"}
        />
      </section>
      {/* Add Bank account Button */}
      <section className="flex justify-between flex-wrap">
        <InvestmentChart />
        <InvestmentChart />
      </section>

      {/* Display account balance Chart 
        pie - for different accounts
        bar - for balance
        trend - for every month balance
        
        */}
      <section></section>

      {/* 
           1. Display All Accounts 
           2. Display account balance
      */}

      <DisplayBankAccount
        fetchBankAccountFn={fetchBankAccountFn}
        bankAccounts={bankAccounts}
        bankAccountError={bankAccountError}
        bankAccountLoading={bankAccountLoading}
        createBankAccountFn={createBankAccountFn}
      />

      <section className="pt-5 pb-5">
        <BankAccountTable />
      </section>
    </div>
  );
};

export default BankAccountPage;
