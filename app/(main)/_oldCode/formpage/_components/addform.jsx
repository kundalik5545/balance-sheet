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
import { CheckCheck, Landmark, Loader, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { addBankSchema } from "@/app/lib/Schema";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useBank from "./useBank";

const AddForm = ({
  children,
  open,
  setOpen,
  edit,
  setEdit,
  editAccountId,
  setEditAccountId,
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

  const {
    createBankAccountFn,
    createBank,
    createBankLoading,
    createBankError,
    // Fetch Bank
    fetchBankAccountFn,
    fetchBankAccounts,

    // Edit Bank
    editBankAccountFn,
    editBankAccounts,
  } = useBank();

  // useEffect(() => {
  //   const getBankAccounts = async () => {
  //     const accounts = await fetchBankAccountFn();
  //     if (edit && editAccountId) {
  //       const accountToEdit = accounts.find(
  //         (account) => account.id === editAccountId
  //       );
  //       if (accountToEdit) {
  //         setValue("bankName", accountToEdit.bankName);
  //       }
  //     }
  //   };

  //   if (edit && editAccountId) {
  //     getBankAccounts();
  //   }
  // }, [edit, editAccountId, fetchBankAccountFn, setValue]);

  useEffect(() => {
    if (edit && editAccountId) {
      reset({ bankName: getValues.bankName });
    }
  }, [edit, editAccountId, reset]);

  // useEffect(() => {
  //   if (edit && editAccountId) {
  //     const accountToEdit = fetchBankAccounts.find(
  //       (account) => account.id === editAccountId
  //     );
  //     if (accountToEdit) {
  //       reset({ bankName: accountToEdit.bankName });
  //     }
  //   }
  // }, [edit, editAccountId, fetchBankAccounts, reset]);

  const handleReset = () => {
    setOpen(false);
    setEdit(false);
    reset({ bankName: "" });
  };

  const onSubmit = async (data) => {
    if (edit) {
      await editBankAccountFn(editAccountId, data);
      console.log("editBankAccounts response is:- ", editBankAccounts);

      // if (response.success) {
      //   toast.success(response.message);
      //   handleReset();
      //   await fetchBankAccountFn();
      // } else {
      //   toast.error(response.message);
      // }
    } else {
      // Create Bank Account
      await createBankAccountFn(data);
      if (createBank.success && !createBankLoading) {
        toast.success(createBank.message);
        handleReset();
        await fetchBankAccountFn();
      } else {
        toast.error(response.message);
      }
    }
  };

  useEffect(() => {
    if (createBankError) {
      toast.error(createBankError.message);
      console.log(createBankError);
    }
  }, [createBankError]);

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
                      createBankLoading ? (
                        <>
                          <Loader /> Updating Bank...
                        </>
                      ) : (
                        <>
                          <Plus size={35} />
                          Edit Bank
                        </>
                      )
                    ) : createBankLoading ? (
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

export default AddForm;
