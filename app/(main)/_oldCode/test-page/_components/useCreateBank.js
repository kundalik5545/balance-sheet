import {
  addBankAccount,
  editBankAccount,
  getBankAccounts,
  deleteBankAccount,
} from "@/actions/oldCode/banks";
import { useState, useEffect } from "react";

const useBankAccount = () => {
  // State management
  const [bankAccounts, setBankAccounts] = useState([]);
  const [apiRes, setApiRes] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [editAccount, setEditAccount] = useState(false);

  // Fetch bank accounts
  const fetchBankAccounts = async () => {
    setLoading(true);
    try {
      const response = await getBankAccounts();
      setBankAccounts(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create a new bank account
  const createBankAccount = async (newAccount) => {
    setLoading(true);
    try {
      const response = await addBankAccount(newAccount);
      setApiRes(response);

      if (!response.ok) throw new Error("Failed to create bank account");
      const createdAccount = await response.json();
      setBankAccounts((prev) => [...prev, createdAccount]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Edit a bank account
  const editBankAccounts = async (id, updatedAccount) => {
    setLoading(true);
    try {
      const response = await editBankAccount(id, updatedAccount);
      if (!response.ok) throw new Error("Failed to edit bank account");
      const updatedAccountData = await response.json();
      setBankAccounts((prev) =>
        prev.map((account) =>
          account.id === id ? updatedAccountData : account
        )
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a bank account
  const deleteBankAccounts = async (id) => {
    setLoading(true);
    try {
      const response = await deleteBankAccount(id);
      if (!response.ok) throw new Error("Failed to delete bank account");
      setBankAccounts((prev) => prev.filter((account) => account.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on hook initialization
  useEffect(() => {
    fetchBankAccounts();
  }, []);

  // Return state and API functions
  return {
    bankAccounts,
    loading,
    error,
    fetchBankAccounts,
    createBankAccount,
    editBankAccounts,
    deleteBankAccounts,
    open,
    setOpen,
    editAccount,
    setEditAccount,
    apiRes,
  };
};

export default useBankAccount;
