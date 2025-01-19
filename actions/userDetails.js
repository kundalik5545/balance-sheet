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
    });

    if (!userDetails) throw new Error("User details not found");

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
