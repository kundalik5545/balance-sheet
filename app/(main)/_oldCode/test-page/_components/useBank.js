import useFetch from "@/hooks/use-Fetch";
import { useState } from "react";

const {
  addBankAccount,
  editBankAccount,
  deleteBankAccount,
  getBankAccounts,
} = require("@/actions/oldCode/banks");

const useBank = () => {
  //   const [open, setOpen] = useState(false);
  //   const [edit, setEdit] = useState(false);
  //   const [editAccountId, setEditAccountId] = useState("");

  // Create Bank Account function
  const {
    apiFun: createBankAccountFn,
    apiRes: createBank,
    loading: createBankLoading,
    error: createBankError,
  } = useFetch(addBankAccount);

  // Fetch Bank Account function
  const {
    apiFun: fetchBankAccountFn,
    apiRes: fetchBankAccounts,
    error: fetchBankAccountError,
    loading: FetchBankAccountLoading,
  } = useFetch(getBankAccounts);

  // Edit Bank Account function
  const {
    apiFun: editBankAccountFn,
    apiRes: editBankAccounts,
    error: editBankAccountError,
    loading: editBankAccountLoading,
  } = useFetch(editBankAccount);

  // Delete Bank Account function
  const {
    apiFun: deleteBankAccountFn,
    apiRes: deleteBankAccounts,
    error: deleteBankAccountError,
    loading: deleteBankAccountLoading,
  } = useFetch(deleteBankAccount);

  return {
    //   Create bank
    createBankAccountFn,
    createBank,
    createBankLoading,
    createBankError,
    // Fetch Bank
    fetchBankAccountFn,
    fetchBankAccounts,
    fetchBankAccountError,
    FetchBankAccountLoading,
    // Edit Bank
    editBankAccountFn,
    editBankAccounts,
    editBankAccountError,
    editBankAccountLoading,
    // Delete Bank
    deleteBankAccountFn,
    deleteBankAccounts,
    deleteBankAccountError,
    deleteBankAccountLoading,
    // Open form
    // open,
    // setOpen,
    // edit,
    // setEdit,
    // Edit Account Id
    // setEditAccountId,
    // editAccountId,
  };
};

export default useBank;
