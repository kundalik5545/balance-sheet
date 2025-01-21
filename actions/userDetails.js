"use server";

import { addExpenseSchema } from "@/app/lib/Schema";
import { prisma } from "@/db/db.config";
import { auth } from "@clerk/nextjs/server";

export async function createUser(data) {
  try {
    // 1. Check if user exists and is logged in
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized User!");
    }

    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // 2. Validate incoming data
    const validatedData = addExpenseSchema.parse(data);

    // 3. Create user details
    const newUser = await prisma.userDetail.create({
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        userId: user.id,
      },
    });

    return {
      success: true,
      message: "User created successfully",
      data: newUser,
    };
  } catch (error) {
    console.error("Error in createUser:", error.message);
    return {
      success: false,
      message: error.message || "An unexpected error occurred",
    };
  }
}

export async function getUserDetails() {
  try {
    // 1. Check if user exists and is logged in
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized User!");

    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // 2. Get user details
    const userDetails = await prisma.userDetail.findMany({
      where: { userId: user.id },
      orderBy: [{ firstName: "asc" }],
    });

    if (userDetails.length === 0) throw new Error("User details not found");

    return {
      success: true,
      message: "User details fetched successfully",
      data: userDetails,
    };
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
}

// /services/userService.js
export const deleteUser = async (dataId) => {
  try {
    // 1. Check if user exists and is logged in
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized User!");
    }

    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // 2. Delete user details
    const deletedUser = await prisma.userDetail.delete({
      where: { id: dataId },
    });

    if (!deletedUser) {
      throw new Error("User not found");
    }

    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const updateUser = async (dataId, data) => {
  console.log("updateUser", dataId, data);
  try {
    // 1. Check if user exists and is logged in
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized User!");
    }

    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // 2. Validate incoming data
    const validatedData = addExpenseSchema.parse(data);

    // 3. Update user details
    const updatedUser = await prisma.userDetail.update({
      where: { id: dataId },
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
      },
    });

    return {
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    };
  } catch (error) {
    return { success: false, message: error.message };
    log("updateUser", error.message);
  }
};
