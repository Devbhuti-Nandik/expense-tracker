import { Category } from "./category";

export type Transaction = {
  id?: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  category: Category;
  description: string;
};

export type TransactionStoreState = {
  transactions: Transaction[];
  expenseAmount: number;
  incomeAmount: number;
  addTransaction: (transaction: Transaction) => void;
  updateExpenseAmount: (expenseAmount: number) => void;
  updateIncomeAmount: (incomeAmount: number) => void;
};

export type TransactionFormInputProps = {
  amount: string;
  date: Date;
  category: Category;
  description: string;
};
