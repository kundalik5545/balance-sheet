"use client";

import React, { use, useEffect, useState } from "react";
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

import { deleteBankAccount, fetchBankAccounts } from "@/actions/oldCode/banks";
import { toast } from "sonner";
import { Pen, Trash } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BarLoader } from "react-spinners";
import useBank from "./useBank";

const DisplayBankAccount = ({
  open,
  setOpen,
  edit,
  setEdit,
  setEditAccountId,
}) => {
  // const [data, setData] = useState([]);

  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(0);

  const {
    createBankAccountFn,
    createBank,
    createBankLoading,
    createBankError,

    // Fetch Bank
    fetchBankAccountFn,
    fetchBankAccounts,
    fetchBankAccountError,
    FetchBankAccountLoading,
  } = useBank();

  useEffect(() => {
    const getBankAccounts = async () => {
      await fetchBankAccountFn();
    };

    getBankAccounts();
  }, []);

  useEffect(() => {
    if (fetchBankAccountError) {
      toast.error(fetchBankAccountError.message || "An error occurred");
      console.error(fetchBankAccountError);
    }
  }, [fetchBankAccountError]);

  const handleEdit = (accountId) => {
    setOpen(true);
    setEdit(true);
    setEditAccountId(accountId);
  };

  // useEffect(() => {
  //   // const handleEdit = (accountId) => {
  //   //   console.log("clicked edit with :-", accountId);
  //   //   setOpen(true);
  //   //   setEdit(true);
  //   //   setEditAccountId(accountId);
  //   //   console.log("Open inside handle edit", open);
  //   // };
  // }, []);

  const handleDelete = async (accountId) => {
    console.log(accountId);
  };

  // const handlePrevious = () => {
  //   setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  // };

  // const handleNext = () => {
  //   setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  // };

  // const getPageNumbers = () => {
  //   const pages = [];
  //   const startPage = Math.max(currentPage, 1);
  //   const endPage = Math.min(currentPage + 1, totalPages);

  //   for (let i = startPage; i <= endPage; i++) {
  //     pages.push(i);
  //   }

  //   return pages;
  // };

  // useEffect(() => {
  //   fetchBankAccountFn(currentPage);
  // }, [currentPage, createBankAccountFn]);

  // useEffect(() => {
  //   if (bankAccountError) {
  //     toast.error(bankAccountError.message);
  //     console.log(bankAccountError);
  //   }
  // }, [bankAccountError]);

  // useEffect(() => {
  //   if (bankAccounts && !bankAccountLoading) {
  //     if (bankAccounts.success) {
  //       setData(bankAccounts.data.bankAccounts);
  //       setTotalPages(bankAccounts.data.totalPages);

  //       toast.info(bankAccounts.message);
  //     } else {
  //       toast.error(bankAccounts.message);
  //     }
  //   }
  // }, [bankAccountLoading, bankAccounts]);

  // const handleEdit = (accountId) => {
  //   setEdit(!edit);
  //   setOpen(!open);
  //   seteditAccId(accountId);
  // };

  // const handleDelete = async (accountId) => {
  //   const response = await deleteBankAccount(accountId);
  //   if (response.success) {
  //     toast.success(response.message);
  //     fetchBankAccountFn(currentPage);
  //   }
  // };

  return (
    <div>
      <h3 className="text-2xl gradient-subTitle">Bank Accounts List</h3>

      <section>
        {FetchBankAccountLoading ? (
          <BarLoader className="mt-4" width={"100%"} color="#9333ea" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-left">Sr. No.</TableHead>
                <TableHead className="text-left">Bank Account Name</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fetchBankAccounts &&
                fetchBankAccounts.data.map((item, i) => (
                  <TableRow key={item.id} id={item.id}>
                    <TableCell className="font-medium">{i + 1}</TableCell>
                    <TableCell className="font-medium text-left">
                      {item.bankName}
                    </TableCell>
                    <TableCell className="font-medium flex space-x-2 items-end ">
                      <Button
                        variant="ghost"
                        onClick={() => handleEdit(item.id)}
                      >
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
                ))}
            </TableBody>
          </Table>
        )}
      </section>

      {/* shadcn paggination */}
      {/* <section>
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
        </Pagination> */}
      {/* </section> */}
    </div>
  );
};

export default DisplayBankAccount;
