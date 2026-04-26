import { Category } from "./category";

export type TransactionType = "income" | "expense";
export type TransactionFilterType = "all" | TransactionType;

export type Transaction = {
  id: string;
  amount: number;
  type: TransactionType;
  date: string;
  category: Category;
  description: string;
};

export type TransactionStoreState = {
  transactions: Transaction[];
  expenseAmount: number;
  incomeAmount: number;
  addTransaction: (transaction: Transaction) => void;
  deleteTransaction: (transactionId: string) => void;
  updateExpenseAmount: (expenseAmount: number) => void;
  updateIncomeAmount: (incomeAmount: number) => void;
};

export type TransactionFormInputProps = {
  amount: string;
  date: Date;
  category: Category;
  description: string;
};
