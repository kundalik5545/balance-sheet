import {
  createUser,
  deleteUser,
  getUserDetails,
  updateUser,
} from "@/actions/userDetails";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const useStudentList = () => {
  const [resultData, setResultData] = useState([]);
  const [editUser, setEditUser] = useState(null);

  // Fetch user details from the API
  const getUserDetail = async () => {
    const response = await getUserDetails();
    if (response.success) {
      setResultData(response.data);
    } else {
      toast.error(response.message);
    }
  };

  // Add a new user
  const addUser = async (data) => {
    const response = await createUser(data);
    if (response.success) {
      setResultData((prevData) => [...prevData, response.data]);
      toast.success("User added successfully!");
    } else {
      toast.error(response.message);
    }
  };

  // Edit a user's data
  const editUserData = (user) => {
    setEditUser(user);
  };

  // Update user data
  const updateUserData = async (dataId, data) => {
    try {
      const response = await updateUser(dataId, data);

      if (response.success) {
        // Update the state with the new data
        setResultData((prevData) =>
          prevData.map((user) =>
            user.id === dataId ? { ...user, ...data } : user
          )
        );

        // Optionally log after the update is successful
        toast.success("User updated successfully!");
        setEditUser(null);
      } else {
        toast.error(response.message);
        console.log("Error Message:", response.message);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Something went wrong while updating the user.");
    }
  };

  // Delete a user
  const deleteUserData = async (dataId) => {
    const response = await deleteUser(dataId);
    if (response.success) {
      setResultData((prevData) =>
        prevData.filter((user) => user.id !== dataId)
      );
      toast.success("User deleted successfully!");
    } else {
      toast.error(response.message);
    }
  };

  // Initial fetch when the component mounts
  useEffect(() => {
    getUserDetail();
  }, []);

  return {
    resultData,
    editUser,
    addUser,
    editUserData,
    updateUserData,
    deleteUserData,
  };
};
