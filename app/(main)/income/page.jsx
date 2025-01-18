"use client";

import { addIncomeSchema } from "@/app/lib/Schema";
import InvestmentChart from "@/components/CommanComponets/InvestmentChart";
import QuickStatCard from "@/components/CommanComponets/QuickStatCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarIcon,
  CircleArrowDown,
  CircleArrowUp,
  DollarSign,
  Landmark,
  TrendingUp,
} from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { transactionCategorys } from "@/data/Categories";

const IncomePage = () => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);

  return (
    <div className="container mx-auto border p-4 max-w-7xl mt-8 shadow-sm rounded-md">
      {/* Header Section */}
      <section className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gradient-subTitle text-3xl space-x-3">
          <span className="bg-blue-100 rounded-full p-2 shadow-lg">
            <TrendingUp color="green" size={25} />
          </span>
          <span>Income</span>
        </h2>
        {/* Add Income Button */}{" "}
        <AddIncomeForm open={open} setOpen={setOpen} editMode={editMode}>
          <Button>Add Income</Button>
        </AddIncomeForm>
      </section>

      {/* Quick Stats card */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <QuickStatCard
          topTitle="Total Income"
          MainAmt="85,450"
          iconName={<DollarSign />}
          statsChange="35% less than goal."
          statTextColor="text-green-500"
          bgColor="bg-green-200"
        />
        <QuickStatCard
          topTitle="Top Income This Month"
          MainAmt="75,450"
          iconName={<CircleArrowUp color="blue" />}
          statsChange="63.4% of total Income."
          statTextColor="text-blue-500"
          bgColor="bg-blue-200"
        />
        <QuickStatCard
          topTitle="Last Month Income"
          MainAmt="50,450"
          iconName={<CircleArrowDown color="red" />}
          statsChange="-4.4% Decrease from last month."
          statTextColor="text-red-500"
          bgColor="bg-red-200"
        />
        <QuickStatCard
          topTitle="Till Year Income"
          MainAmt="30,440"
          iconName={<TrendingUp />}
          statsChange="+3.4% Increase from past year."
          statTextColor="text-purple-500"
          bgColor="bg-purple-200"
        />
      </section>

      {/* Form to add incomes */}
      {/* <section>
        <AddIncomeForm open={open} setOpen={setOpen} editMode={editMode}>
          <Button>Add Income</Button>
        </AddIncomeForm>
      </section> */}

      {/* Display account balance Chart */}
      <section className="flex justify-between flex-wrap">
        <InvestmentChart />
        <InvestmentChart />
      </section>
    </div>
  );
};

const AddIncomeForm = ({ children, open, editMode, setOpen }) => {
  const transactionType = ["Income", "Transfer", "Investment"];
  const transactionStatus = ["Completed", "Pending"];

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm({
    resolver: zodResolver(addIncomeSchema),
    defaultValues: {
      incomeType: "",
      incomeCategory: "",
      incomeAmount: 0,
      incomeDate: "",
      incomeNote: "",
    },
  });

  const incomeType = watch("incomeType");

  const onSubmit = (data) => {
    console.log(data);
  };

  const filteredCategories = transactionCategorys.filter(
    (category) => category.type === incomeType
  );

  return (
    <Drawer
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          // Reset logic can be added here
        }
      }}
    >
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="flex sm:w-[500px] md:w-[700px] lg:w-[900px] container mx-auto md:p-4 pb-10">
        <DrawerHeader>
          <DrawerTitle className="gradient-subTitle flex justify-center items-center gradient-subTitle text-3xl space-x-3">
            <span className="bg-blue-100 rounded-full p-2 shadow-lg">
              <Landmark color="black" size={25} />
            </span>
            <span>Add Income</span>
          </DrawerTitle>
          <DrawerDescription>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-center gap-4 pb-3 pt-3 md:pt-0">
                <Label className="w-1/2" htmlFor="incomeType">
                  Select Type
                </Label>
                <Select
                  onValueChange={(value) => setValue("incomeType", value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {transactionType.map((type, i) => (
                      <SelectItem key={i} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4 pb-3 pt-3 md:pt-0">
                <Label className="w-1/2" htmlFor="incomeCategory">
                  Select Category
                </Label>
                <Select
                  onValueChange={(value) => setValue("incomeCategory", value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Income AMount */}
              <div className="income-amount flex items-center gap-4 pb-3 pt-3 md:pt-0">
                <Label className="w-1/2" htmlFor="incomeAmount">
                  Income Amount
                </Label>
                <Input
                  className="w-1/2"
                  type="number"
                  id="incomeAmount"
                  name="incomeAmount"
                  placeholder="Enter Income Amount"
                  {...register("incomeAmount")}
                />
              </div>
              {/* Income date */}
              <div className="income-date flex items-center gap-4 pb-3 pt-3 md:pt-0">
                <Label htmlFor="incomeDate" className="w-1/2">
                  Income Date
                </Label>
                <Popover className="w-1/2">
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[150px] pl-3 text-left font-normal",
                        !watch("incomeDate") && "text-muted-foreground"
                      )}
                    >
                      {watch("incomeDate") ? (
                        format(watch("incomeDate"), "PP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white rounded-md shadow-lg">
                    <Calendar
                      mode="single"
                      selected={watch("incomeDate")}
                      onSelect={(date) => setValue("incomeDate", date)}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      className="rounded-md border"
                    />
                  </PopoverContent>
                </Popover>
                {errors.incomeDate && (
                  <p className="text-sm text-red-500">
                    {errors.incomeDate.message}
                  </p>
                )}
              </div>

              {/* Income Note */}
              <div className="description flex items-center gap-4">
                <Label className="w-1/2" htmlFor="incomeNote">
                  Income Description
                </Label>
                <Input
                  className="w-1/2"
                  type="text"
                  id="incomeNote"
                  name="incomeNote"
                  placeholder="Enter Income Amount"
                  {...register("incomeNote")}
                />
              </div>

              <div className="flex items-center space-x-3 my-3 pb-6">
                <Button type="submit">Add Income</Button>
                <Button type="button" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default IncomePage;
