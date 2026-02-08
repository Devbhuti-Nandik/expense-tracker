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
  addTransaction: (transaction: Transaction) => void;
};

export type TransactionFormInputProps = {
  amount: number;
  date: Date;
  category: Category;
  description: string;
};
