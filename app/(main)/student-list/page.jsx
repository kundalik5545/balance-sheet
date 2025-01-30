"use client";
import { Landmark, User } from "lucide-react";
import React from "react";
import AddStudentForm from "./_componets/AddStudentForm";
import { Button } from "@/components/ui/button";
import DisplayStudent from "./_componets/DisplayStudent";
import { useStudentList } from "./_componets/useStudnetList";

const StudentListPage = () => {
  const {
    resultData,
    editUser,
    addUser,
    editUserData,
    updateUserData,
    deleteUserData,
  } = useStudentList();
  return (
    <div className="container mx-auto border p-4 max-w-7xl mt-8 shadow-sm rounded-md">
      {/* Header Section */}
      <section className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gradient-subTitle text-3xl space-x-3">
          <span className="bg-blue-100 rounded-full p-2 shadow-lg">
            <User color="black" size={25} />
          </span>
          <span>Student List Page</span>
        </h2>
        <AddStudentForm
          addUser={addUser}
          editUser={editUser}
          updateUserData={updateUserData}
          setEditUser={editUserData}
        >
          <Button>Add Student</Button>
        </AddStudentForm>
      </section>

      {/* Display student list */}
      <sectio>
        <DisplayStudent
          resultData={resultData}
          handleEdit={editUserData}
          handleDelete={deleteUserData}
        />
      </sectio>
    </div>
  );
};

export default StudentListPage;
