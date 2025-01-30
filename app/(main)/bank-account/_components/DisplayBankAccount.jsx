"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "sonner";
import { IndianRupee, Pen, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BankAccountContext } from "./BankAccountContext";
import { deleteBank, getBankAccount } from "@/actions/bankAccout";
import useFetch from "@/hooks/use-Fetch";
import { formatCurrencyINR } from "@/app/lib/currencyFormatter";

const DisplayBankAccount = () => {
  const {
    currentPage,
    setCurrentPage,
    data,
    setData,
    totalPages,
    setTotalPages,
    setOpen,
    setEditData,
    setEditMode,
    // getBankAccounts,
  } = useContext(BankAccountContext);

  const {
    // Fetch Bank
    getBankFn,
    getBankRes,
    getBankError,
    getBankLoading,
  } = useFetch(getBankAccount);

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(currentPage, 1);
    const endPage = Math.min(currentPage + 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const getBankAccounts = async (currentPage) => {
    await getBankFn(currentPage);
  };

  useEffect(() => {
    getBankAccounts(currentPage);
  }, [currentPage, getBankFn]);

  useEffect(() => {
    if (getBankError) {
      toast.error(getBankError.message || "An error occurred");
      console.error(getBankError);
    }
  }, [getBankError]);

  useEffect(() => {
    if (getBankRes && !getBankLoading) {
      if (getBankRes.success) {
        toast.info(getBankRes.message);
        setTotalPages(getBankRes.data.totalPages);
        setData(getBankRes.data.bankAccounts);
      }
    }
  }, [getBankRes, getBankLoading]);

  const handleEdit = async (editAccData) => {
    setOpen(true);
    setEditMode(true);
    setEditData(editAccData);
  };

  const handleDelete = async (accountId) => {
    if (confirm("Press a button!")) {
      const response = await deleteBank(accountId);
      if (response.success) {
        toast.success(response.message);
        getBankAccounts(currentPage);
      } else {
        toast.error(response.message);
      }
    } else {
      toast.success("Cancel process.");
    }
  };

  return (
    <div>
      <h3 className="text-2xl gradient-subTitle pt-3 pr-3 ">
        Bank Accounts List
      </h3>

      <section>
        {getBankLoading ? (
          // <BarLoader className="mt-4" width={"100%"} color="#9333ea" />
          <p>Loading...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-left">Sr. No.</TableHead>
                <TableHead className="text-left">Bank Account Name</TableHead>
                <TableHead className="text-right">Account Balance</TableHead>
                <TableHead className="text-right">
                  Balance Change Date
                </TableHead>
                <TableHead className="text-center">
                  Current Default Account
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length > 0 ? (
                data.map((item, i) => (
                  <TableRow key={item.id} id={item.id}>
                    <TableCell className="font-medium">{i + 1}</TableCell>
                    <TableCell className="font-medium text-left">
                      {item.bankName}
                    </TableCell>
                    <TableCell className="font-medium text-right">
                      <span className="flex items-center justify-end">
                        {formatCurrencyINR(item.openingBalance)}
                      </span>
                    </TableCell>
                    <TableCell className="font-medium text-right">
                      {new Date(item.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      {item.isDefault ? "Yes" : "No"}
                    </TableCell>
                    <TableCell className="font-medium flex space-x-1 items-center">
                      <Button variant="ghost" onClick={() => handleEdit(item)}>
                        <span className="bg-blue-100 rounded-full p-2 shadow-lg">
                          <Pen size={15} color="blue" />
                        </span>
                      </Button>
                      <Button
                        onClick={() => handleDelete(item.id)}
                        variant="ghost"
                      >
                        <span className="bg-red-100 rounded-full p-2 shadow-lg">
                          <Trash size={15} color="red" />
                        </span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </section>

      {/* Pagination */}
      <section>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePrevious}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            {getPageNumbers().map((page) => (
              <PaginationItem key={page} active={page === currentPage}>
                <PaginationLink href="#" onClick={() => setCurrentPage(page)}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={handleNext}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </div>
  );
};

export default DisplayBankAccount;
