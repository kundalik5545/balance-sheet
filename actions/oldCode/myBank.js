"use server";

import { prisma } from "@/db/db.config";
import { auth } from "@clerk/nextjs/server";

export const addBank = async (data) => {
  try {
    // 1. Check if user exists and is logged in
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized User!");

    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");
    const bankAccountExist = await prisma.BankAccount.findFirst({
      where: {
        bankName: data.bankName.toLowerCase(),
        userId: user.id,
      },
    });

    if (bankAccountExist)
      return {
        success: false,
        message: "Bank account already exists",
        data: null,
      };

    // 2. Add bank account
    const bankAccount = await prisma.BankAccount.create({
      data: {
        bankName: data.bankName.toLowerCase(),
        userId: user.id,
      },
    });

    return {
      success: true,
      message: "Bank account added successfully",
      data: bankAccount,
    };
  } catch (error) {
    console.error("Error getting investments:", error.message);
  }
};

export const getBank = async () => {
  try {
    // 1. Check if user exists and is logged in
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized User!");

    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // 2. Get user bank accounts
    const bankAccounts = await prisma.BankAccount.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        bankName: "asc",
      },
    });

    return {
      success: true,
      message: "Bank accounts fetched successfully",
      data: bankAccounts,
    };
  } catch (error) {
    console.error("Error getting investments:", error.message);
  }
};

export const getBankAccounts = async (page = 1) => {
  try {
    // 1. Check if user exists and is logged in
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized User!");

    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const pageSize = 10; // Number of records per page

    // 2. Get user bank accounts with pagination
    const [bankAccounts, totalRecords] = await Promise.all([
      prisma.BankAccount.findMany({
        where: {
          userId: user.id,
        },
        skip: (page - 1) * pageSize, // Skip records for previous pages
        take: pageSize, // Limit to 10 records per page
      }),
      prisma.BankAccount.count({
        where: {
          userId: user.id,
        },
      }),
    ]);

    const totalPages = Math.ceil(totalRecords / pageSize);

    return {
      success: true,
      message: "Bank accounts fetched successfully",
      data: {
        bankAccounts,
        totalRecords,
        totalPages,
        currentPage: page,
      },
    };
  } catch (error) {
    console.error("Error getting bank accounts:", error.message);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const deleteBank = async (id) => {
  try {
    // 1. Check if user exists and is logged in
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized User!");

    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // 2. Delete bank account
    const bankAccount = await prisma.BankAccount.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
      message: "Bank account deleted successfully",
      data: bankAccount,
    };
  } catch (error) {
    console.error("Error getting investments:", error.message);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const editBank = async (id, data) => {
  try {
    // 1. Check if user exists and is logged in
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized User!");

    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // 2. Edit bank account
    const bankAccount = await prisma.BankAccount.update({
      where: {
        id,
      },
      data: {
        bankName: data.bankName.toLowerCase(),
      },
    });

    return {
      success: true,
      message: "Bank account updated successfully",
      data: bankAccount,
    };
  } catch (error) {
    console.error("Error getting investments:", error.message);
    return {
      success: false,
      message: error.message,
    };
  }
};
