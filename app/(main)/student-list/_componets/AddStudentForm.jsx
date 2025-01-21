// Source:
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addExpenseSchema } from "@/app/lib/Schema";

const AddStudentForm = ({ addUser, editUser, updateUserData, setEditUser }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addExpenseSchema),
    defaultValues: { firstName: "", lastName: "" },
  });

  useEffect(() => {
    if (editUser) {
      reset({ firstName: editUser.firstName, lastName: editUser.lastName });
    } else {
      reset({ firstName: "", lastName: "" });
    }
  }, [editUser, reset]);

  const handleReset = () => {
    reset({ firstName: "", lastName: "" });
    setEditUser(null); // Reset the editUser state
  };

  const onSubmit = async (data) => {
    if (editUser) {
      // If we are editing, update the user
      updateUserData(editUser.id, data);
    } else {
      // If we are adding a new user
      addUser(data);
    }
    handleReset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input {...register("firstName")} placeholder="First Name" />
        {errors.firstName && <span>{errors.firstName.message}</span>}
      </div>
      <div>
        <Input {...register("lastName")} placeholder="Last Name" />
        {errors.lastName && <span>{errors.lastName.message}</span>}
      </div>
      <Button type="submit">{editUser ? "Update" : "Submit"}</Button>
      <Button type="button" onClick={handleReset}>
        Cancel
      </Button>
    </form>
  );
};

export default AddStudentForm;
