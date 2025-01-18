"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import AddForm from "./_components/addform";
import DisplayData from "./_components/displaydata";

const MyForm = () => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editFormData, setEditFormData] = useState();

  return (
    <div>
      <h1 className="text-2xl gradient-subTitle">Bank Accounts Test Page</h1>
      {/* Add Bank Acc form */}
      <section>
        <AddForm
          open={open}
          setOpen={setOpen}
          edit={edit}
          setEdit={setEdit}
          editFormData={editFormData}
        >
          <Button>Add Test Bank</Button>
        </AddForm>
      </section>
      {/* Display Bank Accounts */}
      <section>
        <DisplayData
          open={open}
          setOpen={setOpen}
          edit={edit}
          setEdit={setEdit}
          setEditFormData={setEditFormData}
        />
      </section>
    </div>
  );
};

export default MyForm;
