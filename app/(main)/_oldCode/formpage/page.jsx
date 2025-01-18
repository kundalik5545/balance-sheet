"use client";
import { useState } from "react";
import DisplayData from "./_components/displaydata";
import AddForm from "./_components/addform";

export default function Page() {
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleEdit = (data) => {
    setEditData(data); // Set the data to be edited
    setFormOpen(true); // Open the form
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditData(null); // Reset edit data
  };

  return (
    <div>
      <button onClick={() => setFormOpen(true)}>Add New</button>
      {formOpen && <AddForm initialData={editData} onClose={handleCloseForm} />}
      <DisplayData onEdit={handleEdit} />
    </div>
  );
}
