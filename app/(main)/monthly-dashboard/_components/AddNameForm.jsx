"use client";
import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { addExpenseSchema } from "@/app/lib/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Landmark } from "lucide-react";
import { Label } from "@/components/ui/label";
import { createUser } from "@/actions/userDetails";

const AddNameForm = ({ children, setUpdateData }) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addExpenseSchema),
    defaultValues: { firstName: "", lastName: "" },
  });

  const handleReset = () => {
    reset({ firstName: "", lastName: "" });
  };

  const onSubmit = async (data) => {
    const response = await createUser(data);
    if (response.success) {
      handleReset();
      setUpdateData(true);
      setOpen(false);
    }
  };

  return (
    <div>
      <Drawer
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            handleReset();
          }
        }}
        className="flex flex-col items-center w-[600px]"
        placement="right"
      >
        <DrawerTrigger>{children}</DrawerTrigger>
        <DrawerContent className="flex items-center sm:w-[500px] md:w-[700px] lg:w-[900px] container mx-auto md:p-4 pb-10">
          <DrawerHeader>
            <DrawerTitle className="gradient-subTitle flex justify-center items-center gradient-subTitle text-3xl space-x-3">
              <span className="bg-blue-100 rounded-full p-2 shadow-lg">
                <Landmark color="black" size={25} />
              </span>
              <span className="pb-5">Add Name</span>
            </DrawerTitle>
            <DrawerDescription>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex  items-center space-y-3 gap-4 pb-3 pt-3 md:pt-0">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="">
                    <Input
                      {...register("firstName")}
                      placeholder="First name"
                      className="w-[500px]"
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-500 space-x-2 space-y-1">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-y-3 gap-4 pb-3 pt-3 md:pt-0">
                  <Label htmlFor="lastName">Last Name</Label>
                  <div className="">
                    <Input
                      {...register("lastName")}
                      placeholder="Last name"
                      className="w-[500px]"
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-500 space-x-2 space-y-1">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="btn-form flex   items-start  gap-4 pb-3 pt-3 md:pt-0">
                  <Button type="submit">Submit</Button>
                  <Button type="button" onClick={() => handleReset()}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default AddNameForm;
