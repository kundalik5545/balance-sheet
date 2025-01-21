import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DisplayStudent = ({ resultData, handleEdit, handleDelete }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Sr. No</TableHead>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {resultData && resultData.length > 0 ? (
          resultData.map((data, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{data.firstName}</TableCell>
              <TableCell>{data.lastName}</TableCell>
              <TableCell className="flex space-x-2">
                <Button onClick={() => handleEdit(data)}>Edit</Button>
                <Button onClick={() => handleDelete(data.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan="4">No data available</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DisplayStudent;
