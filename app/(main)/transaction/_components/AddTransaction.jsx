"use client";
import React from "react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addTransactionSchema } from "@/app/lib/Schema";
import { transactionCategories } from "@/data/Categories";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

const AddTransaction = ({ children }) => {
  const transactionType = ["INCOME", "EXPENSE", "INVESTMENT", "TRANSFER"];

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addTransactionSchema),
    defaultValues: {
      type: "",
      category: "",
      amount: "",
      date: "",
      // description: "",
      // status: "",
    },
  });

  // const date = watch("date");
  const type = watch("type");

  const filteredCategories = transactionCategories.filter(
    (category) => category.type === type
  );

  const handleReset = () => {};

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <Drawer>
        <DrawerTrigger>{children}</DrawerTrigger>
        <DrawerContent className="flex items-center sm:w-[500px] md:w-[700px] lg:w-[900px] container mx-auto md:p-4 pb-10">
          <DrawerHeader>
            <DrawerTitle className="gradient-subTitle flex justify-center items-center gradient-subTitle text-3xl space-x-3">
              <span className="bg-blue-100 rounded-full p-2 shadow-lg">
                <ArrowLeftRight color="black" size={25} />
              </span>
              <span className="pb-5">Add Transaction</span>
            </DrawerTitle>
            <DrawerDescription className="flex items-center sm:w-[500px] md:w-[700px] lg:w-[900px] container mx-auto md:p-4 pb-10">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Type */}
                <div className="flex items-center space-y-3 gap-4 pb-3 pt-3 md:pt-0">
                  <Label htmlFor="type">Transaction Type</Label>
                  <div>
                    <Select onValueChange={(value) => setValue("type", value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {transactionType.map((type) => (
                          <SelectItem key={type} value={type}>
                            {`${
                              type.charAt(0).toUpperCase() +
                              type.slice(1).toLowerCase()
                            }`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {errors.type && (
                      <p className="text-red-600 text-sm">
                        {errors.type.message}
                      </p>
                    )}
                  </div>
                </div>
                {/*Category  */}
                <div className="">
                  <Label htmlFor="category">Select Category</Label>
                  <Select
                    onValueChange={(value) => setValue("category", value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredCategories.length > 0 ? (
                        filteredCategories.map((category, i) => (
                          <SelectItem value={category.name} key={i}>
                            {category.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem disabled>
                          No categories available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-red-500">
                      {errors.category.message}
                    </p>
                  )}
                </div>
                {/* Amount  */}
                <div className="opening-balance flex items-center flex-wrap space-y-3 pb-3 pt-3 md:pt-0">
                  <Label htmlFor="amount" className="text-base md:w-1/3">
                    Enter Amount :-
                  </Label>
                  <div className="space-y-1 space-x-2">
                    <Input
                      {...register("amount")}
                      type="number"
                      step="0.01"
                      className="w-[280px] text-black text-sm md:text-base"
                      placeholder="Ex. 1000.00/-"
                    />
                    {errors.amount && (
                      <p className="text-red-600 text-sm">
                        {errors.amount.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Date  */}
                <div className="income-date flex items-center gap-4 pb-3 pt-3 md:pt-0">
                  <Label htmlFor="date" className="w-1/2">
                    Transaction Date
                  </Label>
                  <Popover className="w-1/2">
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[150px] pl-3 text-left font-normal",
                          !watch("date") && "text-muted-foreground"
                        )}
                      >
                        {watch("date") ? (
                          format(watch("date"), "PP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white rounded-md shadow-lg">
                      <Calendar
                        mode="single"
                        selected={watch("date")}
                        onSelect={(date) => setValue("date", date)}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        className="rounded-md border"
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.date && (
                    <p className="text-sm text-red-500">
                      {errors.date.message}
                    </p>
                  )}
                </div>
                {/* Description  */}
                <div className=""></div>
                {/* Status  */}
                <div className=""></div>
                {/* Button section */}
                <div className="btn-form flex   items-start  gap-4 pb-3 pt-3 md:pt-0">
                  <Button type="submit">Submit</Button>
                  <Button type="button">Cancel</Button>
                </div>
              </form>
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default AddTransaction;
