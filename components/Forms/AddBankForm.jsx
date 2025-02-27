"use client";

import React, { useEffect, useState } from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { CheckCheck, Landmark, Loader, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { get, useForm } from "react-hook-form";
import { addBankSchema } from "@/app/lib/Schema";
import { toast } from "sonner";
import { editBankAccount } from "@/actions/oldCode/banks";

const AddBankForm = ({
  children,
  createBankAccountFn,
  creatBankLoading,
  createBankError,
  createBank,
  open,
  setOpen,
  edit,
  editAccId,
  bankAccounts,
  fetchBankAccountFn,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addBankSchema),
    defaultValues: { bankName: "" },
  });

  useEffect(() => {
    if (edit && editAccId) {
      // Fetch the account data using editAccId and set the form values
      const account = bankAccounts.data.bankAccounts.find(
        (account) => account.id === editAccId
      );
      if (account) {
        setValue("bankName", account.bankName);
      }
    }
  }, [edit, editAccId, bankAccounts, setValue]);

  const onSubmit = async (data) => {
    if (edit) {
      const response = await edditBankAccount(editAccId, data);
      if (response.success) {
        toast.success(response.message);
        handleReset();
        await fetchBankAccountFn();
      } else {
        toast.error(response.message);
      }
    } else {
      // Create Bank Account
      const response = await createBankAccountFn(data);
      if (response.success) {
        toast.success(response.message);
        handleReset();
        await fetchBankAccountFn();
      } else {
        toast.error(response.message);
      }
    }
  };

  const handleReset = () => {
    setOpen(false);
    reset();
  };

  useEffect(() => {
    if (createBankError) {
      toast.error(createBankError.message);
      console.log(createBankError);
    }
  }, [createBankError]);

  useEffect(() => {
    if (createBank && !creatBankLoading) {
      if (createBank.success) {
        toast.success(createBank.message);
        handleReset();
        fetchBankAccountFn();
      } else {
        toast.error(createBank.message);
      }
    }
  }, [creatBankLoading, createBank]);

  return (
    <div>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent className="flex sm:w-[500px] md:w-[700px] lg:w-[900px] container mx-auto md:p-4 pb-10">
          <DrawerHeader>
            <DrawerTitle className="gradient-subTitle flex justify-center items-center gradient-subTitle text-3xl space-x-3">
              <span className="bg-blue-100 rounded-full p-2 shadow-lg">
                <Landmark color="black" size={25} />
              </span>
              <span>Bank</span>
            </DrawerTitle>
            <DrawerDescription>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col items-start space-y-3 pb-3 pt-3 md:pt-0">
                  <Label htmlFor="bankName" className="text-lg md:text-base">
                    Enter Bank Name :-
                  </Label>
                  <Input
                    {...register("bankName")}
                    placeholder="Ex. State Bank Of India."
                    id="bankName"
                    name="bankName"
                    className="w-full text-black text-base md:text-sm"
                  />
                  {errors.bankName && (
                    <p asChild className="text-red-600 text-sm">
                      {errors.bankName.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-3 my-3 pb-6">
                  <Button
                    type="submit"
                    size="sm"
                    variant="default"
                    className="p-5 md:p-3 text-base md:text-sm"
                  >
                    {edit ? (
                      creatBankLoading ? (
                        <>
                          <Loader /> Updating Bank...
                        </>
                      ) : (
                        <>
                          <Plus size={35} />
                          Edit Bank
                        </>
                      )
                    ) : creatBankLoading ? (
                      <>
                        <Loader /> Adding Bank...
                      </>
                    ) : (
                      <>
                        <Plus size={35} />
                        Add Bank
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    size="sm"
                    variant="default"
                    onClick={() => handleReset()}
                    className="p-5 md:p-3 text-base md:text-sm"
                  >
                    Cancel
                  </Button>
                </div>
              </form>

              {/* Info Section */}
              <section>
                <p className="pb-4 flex items-center space-x-2">
                  <span className="bg-green-100 rounded-full p-2 shadow-lg">
                    <CheckCheck color="green" />
                  </span>
                  <span>Add as many bank as you want.</span>
                </p>
                <p className="pb-4 flex items-center space-x-2">
                  <span className="bg-green-100 rounded-full p-2 shadow-lg">
                    <CheckCheck color="green" />
                  </span>
                  <span>Add 1 bank at a time.</span>
                </p>
                <p className="pb-4 flex items-center space-x-2">
                  <span className="bg-green-100 rounded-full p-2 shadow-lg">
                    <CheckCheck color="green" />
                  </span>
                  <span>You can edit any bank later.</span>
                </p>
              </section>
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default AddBankForm;
