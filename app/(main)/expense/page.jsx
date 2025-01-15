import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { expenseTransactions } from "@/data/RawData";

const ExpensePage = () => {
  return (
    <div className="container mx-auto border p-4 max-w-7xl mt-8 shadow-sm rounded-md">
      {/* Header Section */}
      <section className="flex items-center justify-between">
        <h2 className="gradient-subTitle text-3xl">Expense Page</h2>
        <Link href="/">
          <Button>Add Expense</Button>
        </Link>
      </section>

      {/* Expense Chart */}
      <section className="mt-4"></section>

      {/* Expense Transaction Table */}
      <section className="mt-4">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Trans No</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Sub Category</TableHead>
              <TableHead>Trans Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenseTransactions.map((trans, i) => (
              <TableRow key={trans.id}>
                <TableCell className="font-medium">
                  {`${trans.id}-${i + 1}`}
                </TableCell>
                <TableCell>{trans.category}</TableCell>
                <TableCell>{trans.subCategory}</TableCell>
                <TableCell>{trans.date}</TableCell>
                <TableCell>{trans.description}</TableCell>
                <TableCell className="text-right">${trans.amount}.00</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};

export default ExpensePage;
