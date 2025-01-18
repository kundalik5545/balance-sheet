import { getBank } from "@/actions/oldCode/banks";
import { transactionCategorys } from "@/data/Categories";
import React from "react";
import AddIncomeForm from "../_components/AddIncomeForm";

const AddIncomePage = async () => {
  const bankAccounts = await getBank();

  return (
    <div className="max-w-3xl mx-auto px-5">
      <h2 className="gradient-subTitle text-4xl mb-8">Add Income</h2>

      <section>
        <AddIncomeForm
          bankAccounts={bankAccounts}
          categoires={transactionCategorys}
        />
      </section>
    </div>
  );
};

export default AddIncomePage;
