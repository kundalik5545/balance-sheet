import {
  ArrowRightLeft,
  ChevronDown,
  ChevronDownCircle,
  CircleMinus,
} from "lucide-react";
import React from "react";
import AddTransaction from "../_components/AddTransaction";
import { Button } from "@/components/ui/button";

const ExpensePage = () => {
  return (
    <div className="container mx-auto border p-4 max-w-7xl mt-8 shadow-sm rounded-md">
      {/* Header Section */}
      <section className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gradient-subTitle text-3xl space-x-3">
          <span className="bg-blue-100 rounded-full p-2 shadow-lg">
            <ArrowRightLeft color="black" size={25} />
          </span>
          <span>Add Transaction</span>
        </h2>
        <AddTransaction>
          <Button>
            <CircleMinus /> Add Expense Transaction
          </Button>
        </AddTransaction>
      </section>
    </div>
  );
};

export default ExpensePage;
