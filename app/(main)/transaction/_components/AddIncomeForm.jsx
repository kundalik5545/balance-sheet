"use client";

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

  // console.log("backend response to frontend:- ", apiRes1);
  // console.log("backend response to frontend:- ", apiRes2);

  const addBankData = {
    bankName: "Dev Bank",
    date: new Date().toISOString(),
    openingBalance: 1000,
    isDefault: true,
  };

  const addTransactionData = {
    bankAccountId: "a828b2f3-b8b3-4fc2-a2b0-b50a08fe14b0",
    transferAccountId: "0a1f3742-8e06-4718-a177-f6b9ed511795",
    // accountBalanceId: "0db6c31d-e3e1-4068-890c-ad096d9674e4",
    type: "TRANSFER",
    category: "SELF",
    amount: 50,
    date: new Date().toISOString(),
    description: "Enjoy the money!!!.",
    status: "COMPLETED",
  };

  return (
    <div>
      <h2>Fetch current balance</h2>
      <Button onClick={() => apiFn1(addTransactionData)}>Add Trans</Button>
      <Button onClick={() => apiFn2(addBankData)}>Add bank</Button>

      {loading1 && <p>Loading...</p>}
      {loading2 && <p>Loading...</p>}
    </div>
  );
};

export default AddIncomeForm;
