export const TRANSACTION_CATEGORIES = [
  'Food & Dining',
  'Shopping',
  'Transportation',
  'Bills & Utilities',
  'Entertainment',
  'Health & Fitness',
  'Travel',
  'Education',
  'Gifts & Donations',
  'Business',
  'Investments',
  'Salary',
  'Other Income',
  'Other Expenses'
] as const

export type TransactionCategory = typeof TRANSACTION_CATEGORIES[number]

export const TRANSACTION_TYPES = ['INCOME', 'EXPENSE', 'TRANSFER', 'INVESTMENT'] as const

export type TransactionType = typeof TRANSACTION_TYPES[number]