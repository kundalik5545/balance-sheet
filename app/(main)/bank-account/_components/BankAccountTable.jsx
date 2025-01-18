"use client";

import {
  fetchCacheBankAccounts,
  getCacheBankAccounts,
} from "@/actions/oldCode/banks";
import React, { useState, useEffect } from "react";

const BankAccountTable = () => {
  const [accounts, setAccounts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch bank accounts
  const fetchAccounts = async (page) => {
    setLoading(true);
    try {
      const response = await fetchCacheBankAccounts(page);
      if (response.success) {
        setAccounts(response.data.bankAccounts);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component mounts or page changes
  useEffect(() => {
    fetchAccounts(currentPage);
  }, [currentPage]);

  // Handle pagination
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div>
      <h1>Bank Accounts with caching</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="shadcn-table">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Account Number</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, i) => (
              <tr key={account.id}>
                <td>{i + 1}</td>
                <td>{account.bankName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="shadcn-button"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="shadcn-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BankAccountTable;
