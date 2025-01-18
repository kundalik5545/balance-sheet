import { CirclePlus, Landmark } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

const AddCategoryPage = () => {
  return (
    <div className="container mx-auto border p-4 max-w-7xl mt-8 shadow-sm rounded-md">
      {/* Header Section */}
      <section className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gradient-subTitle text-3xl space-x-3">
          <span className="bg-blue-100 rounded-full p-2 shadow-lg">
            <CirclePlus color="black" size={25} />
          </span>
          <span>Add Category</span>
        </h2>
        {/* Add Category Form */}
        <section>
          <Button>Add Bank Account</Button>
        </section>
      </section>
    </div>
  );
};

export default AddCategoryPage;
