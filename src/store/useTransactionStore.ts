import { create } from "zustand";
import { Transaction, TransactionStoreState } from "../types/transaction";

/**
 * Transaction store to manage the transactions state
 * @returns TransactionStoreState
 * set: similar to setState in useState but in global state management context
 * state: similar to prevState in useState, but here 'state' is the entire 'TransactionStoreState' object
 * which includes transactions(actual state), addTransaction(action) etc.
 */
export const useTransactionStore = create<TransactionStoreState>((set) => ({
  transactions: [],
  expenseAmount: 0,
  incomeAmount: 0,
  addTransaction: (transaction: Transaction) => {
    set((state) => ({
      transactions: [...state.transactions, transaction],
    }));
  },
  updateExpenseAmount: (expenseAmount: number) => {
    set((state) => ({ expenseAmount: state.expenseAmount + expenseAmount }));
  },
  updateIncomeAmount: (incomeAmount: number) => {
    set((state) => ({ incomeAmount: (state.incomeAmount += incomeAmount) }));
  },
}));
