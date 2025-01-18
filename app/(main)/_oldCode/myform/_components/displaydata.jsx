"use client";

import React, { useEffect, useState } from "react";
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
import { Pen, Trash } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BarLoader } from "react-spinners";
import useMyBank from "./useMyBank";
import { deleteBank } from "@/actions/oldCode/myBank";

const DisplayData = ({ setOpen, setEdit, setEditFormData }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const {
    // Fetch Bank
    getBankFn,
    getBankRes,
    getBankError,
    getBankLoading,
  } = useMyBank();

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
  }, [currentPage]);

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
    setEdit(true);
    setEditFormData(editAccData);
  };

  const handleDelete = async (accountId) => {
    const response = await deleteBank(accountId);
    if (response.success) {
      toast.success(response.message);
      getBankAccounts(currentPage);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div>
      <h3 className="text-2xl gradient-subTitle">Bank Accounts List</h3>

      <section>
        {getBankLoading ? (
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
              {data &&
                data.map((item, i) => (
                  <TableRow key={item.id} id={item.id}>
                    <TableCell className="font-medium">{i + 1}</TableCell>
                    <TableCell className="font-medium text-left">
                      {item.bankName}
                    </TableCell>
                    <TableCell className="font-medium flex space-x-2 items-end ">
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
                ))}
            </TableBody>
          </Table>
        )}
      </section>

      {/* shadcn paggination */}
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
                <PaginationLink onClick={() => setCurrentPage(page)}>
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

export default DisplayData;
