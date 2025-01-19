"use client";

import React, { useEffect, useState } from "react";
import AddNameForm from "./_components/AddNameForm";
import { Button } from "@/components/ui/button";
import { Landmark } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { getUserDetails } from "@/actions/userDetails";

const MonthlyBudget = () => {
  const [resultData, setResultData] = useState();
  const [updateData, setUpdateData] = useState(false);

  const getUserDetail = async () => {
    const response = await getUserDetails();
    if (response.success) {
      setResultData(response.data);
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    if (updateData) {
      getUserDetail();
      setUpdateData(false);
    }
    getUserDetail();
  }, [updateData]);

  return (
    <div className="container mx-auto border p-4 max-w-7xl mt-8 shadow-sm rounded-md">
      {/* Header Section */}
      <section className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gradient-subTitle text-3xl space-x-3">
          <span className="bg-blue-100 rounded-full p-2 shadow-lg">
            <Landmark color="black" size={25} />
          </span>
          <span>Add Name</span>
        </h2>
        <AddNameForm setUpdateData={setUpdateData}>
          <Button>Add Bank Account</Button>
        </AddNameForm>
      </section>

      {/* Add transaction form */}
      {/* Display transaction table */}
      <section>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Sr. No</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resultData &&
              resultData.length > 0 &&
              resultData.map((data, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{data.firstName}</TableCell>
                    <TableCell>{data.lastName}</TableCell>
                    <TableCell className="flex space-x-2">
                      <Button>Edit</Button>
                      <Button>Delete</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </section>
      {/* Chart to display transaction */}
    </div>
  );
};

export default MonthlyBudget;
