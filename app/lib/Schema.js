import { z } from "zod";

// Add Bank Schema
export const addBankSchema = z.object({
  bankName: z.string().nonempty("Bank name required."),
  date: z.date(),
  openingBalance: z.preprocess(
    (val) => parseFloat(val), // Convert string to float
    z
      .number()
      .positive("Opening balance must be a positive number in 0.00 format.")
  ),
  isDefault: z.boolean(),
});

// Add Transaction Schema
export const addTransactionSchema = z.object({
  type: z.enum(["INCOME", "EXPENSE", "TRANSFER", "INVESTMENT"]),
  category: z.string().min(1, "Category is required"),

  // Conditional validation for subCategory
  subCategory: z.string().optional(),
  date: z.date(),
  amount: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Amount must be greater than 0")
  ),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["PENDING", "COMPLETED"]),
  bankAccountId: z.string().nonempty("Bank account id required."),
  transferAccountId: z.string().optional(),
});

// export const transactionSchema = z.object({
//   type: z.enum(["INCOME", "EXPENSE", "TRANSFER", "INVESTMENT"]),
//   category: z.string().min(1, "Category is required"),
//   subCategory: z.string().min(1, "sub Category is required"),
//   date: z.date(),
//   amount: z.preprocess(
//     (val) => Number(val), // Preprocess the value into a number
//     z.number().min(1, "Amount must be greater than 0") // Validate that it is a number and meets the minimum value
//   ),
//   description: z.string().min(1, "Description is required"),
//   status: z.enum(["PENDING", "COMPLETED"]),
//   bankAccountId: z.string().nonempty("Bank account id required."),
//   transferAccountId: z.string().optional(),
// });

export const transactionSchema = z.object({
  type: z.enum(["INCOME", "EXPENSE", "TRANSFER", "INVESTMENT"]),
  category: z.string().min(1, "Category is required"),

  // Conditional validation for subCategory
  subCategory: z.string().optional(),
  date: z.date(),
  amount: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Amount must be greater than 0")
  ),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["PENDING", "COMPLETED"]),
  bankAccountId: z.string().nonempty("Bank account id required."),
  transferAccountId: z.string().optional(),
});

// Add Income Schema
export const addIncomeSchema = z.object({
  bankAccountId: z.string().nonempty("Bank account id required."),
  transferAccountId: z.string().optional(),
  type: z.enum(["INCOME", "EXPENSE", "INVESTMENT", "TRANSFER"]),
  category: z.string().nonempty("Transaction category required."),
  amount: z.number().min(1, "Amount must be greater than 0"),
  date: z.date(),
  description: z.string(),
  status: z.string().nonempty("Transaction status required."),
});

// Add Expense Schema
export const addExpenseSchema = z.object({
  firstName: z.string().nonempty("First Name required."),
  lastName: z.string().nonempty("Last Name required."),
});
