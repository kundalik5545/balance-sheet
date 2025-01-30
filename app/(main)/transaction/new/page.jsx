"use client";
import { AuthGuard } from "@/app/lib/auth-guard";
import { addTransactionSchema } from "@/app/lib/Schema";
import { ArrowRightLeft, CalendarIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  transactionCategories,
  transactionCategories2,
  transactionCategories3,
} from "@/data/Categories";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { getDefaultBankAccount } from "@/actions/bankAccout";
import { useRouter } from "next/navigation";
import { createTransaction } from "@/actions/transaction";

const transactionTypes = ["INCOME", "EXPENSE", "INVESTMENT", "TRANSFER"];

const TransactionPage = () => {
  const [defaultBankAcc, setDefaultBankAcc] = useState(null);
  const [otherAccounts, setOtherAccounts] = useState(null);
  const [defaultBankId, setdefaultBankId] = useState(null);

  const navigation = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm({
    resolver: zodResolver(addTransactionSchema),
    defaultValues: {
      type: "",
      category: "",
      subCategory: "",
      amount: "",
      date: "",
      description: "",
      status: "",
      bankAccountId: "",
      transferAccountId: "",
    },
  });
  const type = watch("type");
  const category = watch("category");
  const date = watch("date");
  const subCategory = watch("subCategory");
  const bankAccountId = watch("bankAccountId");

  const filteredCategories = transactionCategories3.filter(
    (category) => category.type.toLowerCase() === type?.toLowerCase()
  );

  const filteredSubCategories =
    type === "EXPENSE"
      ? transactionCategories3
          .filter((item) => item.name.toLowerCase() === category?.toLowerCase())
          .flatMap((item) => item.subcategories || [])
      : [];

  const onSubmit = async (data) => {
    try {
      const response = await createTransaction(data);
      console.log("add transaction response", response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    reset();
    navigation.back();
  };

  const defaultBankAccount = async () => {
    try {
      const response = await getDefaultBankAccount();
      setDefaultBankAcc(response.data);
      setValue("bankAccountId", response.data.id);
      setdefaultBankId(response.data.id);
      setOtherAccounts(response.otherAccount.map((account) => account));
    } catch (error) {
      console.error("", error);
    }
  };

  useEffect(() => {
    defaultBankAccount();
  }, [setValue]);

  return (
    <AuthGuard>
      <div className="container mx-auto p-2 pt-4 md:pt-0 md:p-6 ">
        <Card className="max-w-2xl mx-auto md:my-10">
          <CardHeader>
            <CardTitle className="text-3xl gradient-subTitle flex text-center space-x-3">
              Add New Transaction
            </CardTitle>
            <CardDescription>
              ✅ Enter the details of your transaction below👇
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="bank-account">
                <Label htmlFor="bankAccountId">Select Bank Account</Label>
                <Select
                  onValueChange={(value) => setValue("bankAccountId", value)}
                  value={watch("bankAccountId")}
                  name="bankAccountId"
                  id="bankAccountId"
                  className="w-full"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={defaultBankAcc?.bankName || "Select Bank"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {otherAccounts?.map((account) => (
                      <SelectItem
                        key={account.id}
                        value={account.id}
                        className="flex justify-between items-center px-4 py-2"
                      >
                        <span className="text-left">{account.bankName}</span>
                        <span className="bg-green-200 px-3 py-1 rounded-full text-sm font-medium">
                          {450}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.bankAccountId && (
                  <p className="text-red-500">{errors.bankAccountId.message}</p>
                )}
              </div>

              {/* type */}
              <div className="type">
                <Label htmlFor="type">Transaction Type</Label>
                <Select
                  onValueChange={(value) => setValue("type", value)}
                  name="type"
                  id="type"
                  className="w-full"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {transactionTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() +
                          type.slice(1).toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="text-red-500">{errors.type.message}</p>
                )}
              </div>

              {/* Category */}
              <div className="category">
                <Label htmlFor="category">Select Category</Label>
                <Select
                  onValueChange={(value) => setValue("category", value)}
                  name="category"
                  id="category"
                  className="w-full"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredCategories?.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-red-500">{errors.category.message}</p>
                )}
              </div>

              {/* Transfer Account id */}
              {type === "TRANSFER" && category === "Self" && (
                <div className="transfer-account">
                  <Label htmlFor="transferAccountId">
                    Select Transfer Account
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setValue("transferAccountId", value)
                    }
                    value={watch("transferAccountId")}
                    name="transferAccountId"
                    id="transferAccountId"
                    className="w-full"
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Transfer Account" />
                    </SelectTrigger>
                    <SelectContent>
                      {otherAccounts?.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          {account.bankName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.transferAccountId && (
                    <p className="text-red-500">
                      {errors.transferAccountId.message}
                    </p>
                  )}
                </div>
              )}
              {/* sub categories */}
              {type === "EXPENSE" && (
                <div className="sub-category">
                  <Label htmlFor="subCategory">Select Sub Category</Label>
                  <Select
                    onValueChange={(value) => setValue("subCategory", value)}
                    value={watch("subCategory")}
                    name="subCategory"
                    id="subCategory"
                    className="w-full"
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Sub Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredSubCategories.map((subCategory) => (
                        <SelectItem key={subCategory} value={subCategory}>
                          {subCategory}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.subCategory && (
                    <p className="text-red-500">{errors.subCategory.message}</p>
                  )}
                </div>
              )}

              {/* Amount */}
              <div className="amount">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  {...register("amount")}
                  type="number"
                  id="amount"
                  placeholder="Enter amount"
                  className="w-full"
                />
                {errors.amount && (
                  <p className="text-red-500">{errors.amount.message}</p>
                )}
              </div>

              {/* Date */}
              <div className="date">
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
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
                  <PopoverContent>
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
                  <p className="text-red-500">{errors.date.message}</p>
                )}
              </div>

              <div className="description">
                <Label htmlFor="description">Description</Label>
                <Input
                  {...register("description")}
                  type="text"
                  id="description"
                  placeholder="Enter description"
                  className="w-full"
                />
                {errors.description && (
                  <p className="text-red-500">{errors.description.message}</p>
                )}
              </div>

              <div className="status">
                <Label htmlFor="status">Status</Label>
                <Select
                  onValueChange={(value) => setValue("status", value)}
                  value={watch("status")}
                  name="status"
                  id="status"
                  className="w-full"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-red-500">{errors.status.message}</p>
                )}
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit">Add Transaction</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  );
};

export default TransactionPage;
