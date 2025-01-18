"use client";
import React, { useState } from "react";
import AddBankForm from "./_components/AddBank";
import { Button } from "@/components/ui/button";
import DisplayBankAccount from "./_components/DisplayBankAcc";

const BankAccountComponent = () => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editAccountId, setEditAccountId] = useState("");
  return (
    <div>
      <h1 className="text-2xl gradient-subTitle">Bank Accounts Test Page</h1>
      {/* Add Bank Acc form */}
      <section>
        <AddBankForm
          open={open}
          setOpen={setOpen}
          edit={edit}
          setEdit={setEdit}
          editAccountId={editAccountId}
        >
          <Button>Add Test Bank</Button>
        </AddBankForm>
      </section>
      {/* Display Bank Accounts */}
      <section>
        <DisplayBankAccount
          open={open}
          setOpen={setOpen}
          edit={edit}
          setEdit={setEdit}
          setEditAccountId={setEditAccountId}
        />
      </section>
    </div>
  );
};

export default BankAccountComponent;
