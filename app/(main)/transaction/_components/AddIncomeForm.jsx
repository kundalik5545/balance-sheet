"use client";

import { totalBankAccountBalance, totalIncome } from "@/actions/bankAccout";
import {
  addBank,
  addTransaction,
  createTransaction,
} from "@/actions/transaction";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-Fetch";
import React from "react";

const AddIncomeForm = () => {
  const {
    apiFun: apiFn1,
    apiRes: apiRes1,
    loading: loading1,
  } = useFetch(createTransaction);
  const {
    apiFun: apiFn2,
    apiRes: apiRes2,
    loading: loading2,
    error,
  } = useFetch(addBank);
  //total bank account balance per userid
  const {
    apiFun: apiFn3,
    apiRes: apiRes3,
    loading: loading3,
  } = useFetch(totalBankAccountBalance);

  // finding total income in current month from transaction table with type income
  // const {
  //   apiFun: apiFn3,
  //   apiRes: apiRes3,
  //   loading: loading3,
  // } = useFetch(totalIncome);

  // console.log("backend response to frontend:- ", apiRes1);
  // console.log("backend response to frontend:- ", apiRes2);

  const addBankData = {
    bankName: "Dev Bank",
    date: new Date().toISOString(),
    openingBalance: 1000,
    isDefault: true,
  };

  const addTransactionData = {
    bankAccountId: "f73e8a1c-0c43-43ef-a12d-62435efe9b61",
    // transferAccountId: "0a1f3742-8e06-4718-a177-f6b9ed511795",
    // accountBalanceId: "0db6c31d-e3e1-4068-890c-ad096d9674e4",
    type: "INCOME",
    category: "Salary",
    amount: 50000,
    date: new Date().toISOString(),
    description: "Enjoy the money!!!.",
    status: "COMPLETED",
  };

  console.log("total income in current month:- ", apiRes3);

  return (
    <div>
      <h2>Fetch current balance</h2>
      <div className=" flex flex-col space-y-4 w-[300px] pt-4">
        <Button onClick={() => apiFn1(addTransactionData)}>Add Trans</Button>
        {/* <Button onClick={() => apiFn2(addBankData)} disable>
          Add bank
        </Button> */}
        <Button onClick={() => apiFn3()}>
          Total bank account balance per userid
        </Button>
      </div>

      {loading1 && <p>Loading...</p>}
      {loading3 && <p>Loading...</p>}
    </div>
  );
};

export default AddIncomeForm;
