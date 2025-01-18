"use server";

import { prisma } from "@/db/db.config";
import { auth } from "@clerk/nextjs/server";

export async function addBank(data) {
  try {
    // 1. Check if user exists and is logged in
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized User!");

    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // 2. Start Transactions
    // let dbOperations = [];

    // 3. Check incoming data and types
    if (
      !data ||
      typeof data.bankName !== "string" ||
      typeof data.date !== "object" ||
      typeof data.openingBalance !== "number" ||
      typeof data.isDefault !== "boolean"
    ) {
      throw new Error("Please check the provoided data types.");
    }

    // 4. Check bank account exists
    const existingBankAccount = await prisma.bankAccount.findFirst({
      where: {
        userId: user.id,
        bankName: data.bankName.toLowerCase(),
      },
    });

    if (existingBankAccount)
      return {
        success: false,
        message: "Bank account already exists",
        data: null,
      };

    // create account prisma transaction fn
    const createAccountTransaction = await prisma.$transaction(async (tx) => {
      const newBankAccount = await tx.bankAccount.create({
        data: {
          bankName: data.bankName.toLowerCase(),
          date: data.date,
          openingBalance: data.openingBalance,
          isDefault: data.isDefault,
          userId: user.id,
        },
      });

      if (!newBankAccount) throw new Error("Bank Account not created");

      // 5. If account created successfully and it is new account then create first transaction and then update the account balance.

      if (newBankAccount.id) {
        const firstTransaction = await tx.transaction.create({
          data: {
            userId: user.id,
            bankAccountId: newBankAccount.id,
            type: "INCOME",
            category: "SELF",
            amount: data.openingBalance,
            date: data.date,
            description: "Account created and first deposite made.",
            status: "COMPLETED",
          },
        });

        if (!firstTransaction) throw new Error("First transaction not created");

        const firstAccountDeposite = await tx.accountBalance.create({
          data: {
            userId: user.id,
            bankAccountId: newBankAccount.id,
            transactionId: firstTransaction.id,
            date: data.date,
            totalDeposite: data.openingBalance,
            totalWithdrawal: 0,
            totalBalance: data.openingBalance,
            description: "Account created and first deposite made.",
          },
        });

        if (!firstAccountDeposite)
          throw new Error("First account balance not created");
      }

      return newBankAccount;
    });

    if (!createAccountTransaction) {
      return {
        success: false,
        message: "Bank account not created",
        data: null,
      };
    }

    if (createAccountTransaction)
      return {
        success: true,
        data: createAccountTransaction,
        message: "Bank account created successfully",
      };

    // 3. Insert bank data in the database
    // const newBankAccount = await prisma.bankAccount.create({
    //   data: {
    //     bankName: data.bankName.toLowerCase(),
    //     date: data.date,
    //     openingBalance: data.openingBalance,
    //     isDefault: data.isDefault,
    //     userId: user.id,
    //   },
    // });

    // if (!newBankAccount) throw new Error("Bank Account not created");

    // 5. If account created successfully and it is new account then update the account balance.

    // if (data.isDefault) {
    //   dbOperations.push(
    //     prisma.accountBalance.create({
    //       data: {
    //         userId: user.id,
    //         bankAccountId: newBankAccount.id,
    //         date: data.date,
    //         totalDeposite: data.openingBalance,
    //         totalWithdrawal: 0,
    //         totalBalance: data.openingBalance,
    //         description: "Account created and first deposite made.",
    //       },
    //     })
    //   );
    // }
  } catch (error) {
    console.error(error || "Error during creating bank account.");
    console.error(error.message);
  }
}

//Get Bank Accounts
export const getBankAccount = async (page = 1) => {
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

//Delete bank account by id
export const deleteBank = async (id) => {
  try {
    // 1. Check if user exists and is logged in
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized User!");

    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // 2. Check bank account exist or not
    const existingBankAccount = await prisma.BankAccount.findUnique({
      where: {
        id: id,
        userId: user.id,
      },
    });

    if (!existingBankAccount) throw new Error("Bank account not found");

    // 2. Delete bank account
    const bankAccount = await prisma.BankAccount.delete({
      where: {
        id: id,
        userId: user.id,
      },
    });

    if (!bankAccount) throw new Error("Bank account not deleted");

    return {
      success: true,
      message: "Bank account deleted successfully",
      data: bankAccount,
    };
  } catch (error) {
    console.error("Error getting investments:", error.message);
    return {
      success: false,
      message: error.message || "Error during deleting bank account",
      data: null,
    };
  }
};

//Edit bank account by id and data
export const editBank = async (id, data) => {
  try {
    // 1. Check if user exists and is logged in
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized User!");

    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // 2. Check bank account exist or not
    const existingBankAccount = await prisma.BankAccount.findUnique({
      where: {
        id: id,
        userId: user.id,
      },
    });

    if (!existingBankAccount) throw new Error("Bank account not found");

    // 3. Edit bank account
    const bankAccount = await prisma.BankAccount.update({
      where: {
        id: id,
        userId: user.id,
      },
      data: {
        bankName: data.bankName.toLowerCase(),
        date: data.date,
        openingBalance: data.openingBalance,
        isDefault: data.isDefault,
      },
    });

    if (!bankAccount) throw new Error("Bank account not updated");
    //make transaction for updating bank account and account balance = > issue in logic
    return {
      success: true,
      message: "Bank account updated successfully",
      data: bankAccount,
    };
  } catch (error) {
    console.error("Error getting investments:", error.message);
    return {
      success: false,
      message: error.message || "Error during updating bank account",
    };
  }
};

// Total Bank Account Balance by user id
export const totalBankAccountBalance = async () => {
  try {
    // 1. Check if user exists and is logged in
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized User!");

    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // 2. Get total bank account balance
    const totalBalance = await prisma.bankAccount.aggregate({
      where: {
        userId: user.id,
      },
      _sum: {
        openingBalance: true,
      },
    });

    const totalOpeningBalance = totalBalance._sum.openingBalance || 0; // Use the summed value or default to 0 if null

    if (!totalBalance) throw new Error("Total bank account balance not found");

    // 3. Get total income for current month
    const totalIncome = await prisma.transaction.aggregate({
      where: {
        userId: user.id,
        type: "INCOME",
        date: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
        },
      },
      _sum: {
        amount: true,
      },
    });

    const totalAmount = totalIncome._sum.amount || 0; // Use the summed value or default to 0 if null

    if (!totalIncome) throw new Error("Total income not found");

    // 4. Get total expense for current month
    const totalExpense = await prisma.transaction.aggregate({
      where: {
        userId: user.id,
        type: "EXPENSE",
        date: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
        },
      },
      _sum: {
        amount: true,
      },
    });

    const totalMonthlyExpense_ThisMonth = totalExpense._sum.amount || 0; // Use the summed value or default to 0 if null

    if (!totalIncome) throw new Error("Total income not found");

    return {
      success: true,
      message: "Total bank account balance fetched successfully",
      totalBalanceThisMonth: totalOpeningBalance,
      totalIncomeThisMonth: totalAmount,
      totalExpenseThisMonth: totalMonthlyExpense_ThisMonth,
    };
  } catch (error) {
    console.error("Error getting total bank account balance:", error.message);
    return {
      success: false,
      message: error.message,
    };
  }
};

//total income for current month from transaction table with type as "INCOME"
export const totalIncome = async () => {
  try {
    // 1. Check if user exists and is logged in
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized User!");

    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // 2. Get total income for current month
    const totalIncome = await prisma.transaction.aggregate({
      where: {
        userId: user.id,
        type: "INCOME",
        date: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
        },
      },
      _sum: {
        amount: true,
      },
    });

    const totalAmount = totalIncome._sum.amount || 0; // Use the summed value or default to 0 if null

    if (!totalIncome) throw new Error("Total income not found");

    return {
      success: true,
      message: "Total income fetched successfully",
      data: totalAmount,
    };
  } catch (error) {
    console.error("Error getting total income:", error.message);
    return {
      success: false,
      message: error.message,
    };
  }
};
