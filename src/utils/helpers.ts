import { Transaction } from "../types/transaction";

/**
 * Sanitize transaction form data
 * @param transaction - Transaction object
 * @returns Sanitized transaction object
 */
export const sanitizeTransactionFormData = (transaction: Transaction) => {
  const { amount, date, category, description, type } = transaction;
  return {
    id: Math.random().toString(36).substring(2, 9), // TODO: Use uuidv4
    amount: Number(amount),
    date,
    category: {
      id: category.id,
      name: category.name,
    },
    description: description.trim(),
    type,
  };
};

/**
 * Sort transactions by date in descending order
 * @param transactions - Array of transactions
 * @returns Array of transactions sorted by date in descending order
 */
export const sortTransactionsByDate = (transactions: Transaction[]) => {
  return [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

/**
 * Group transactions by date
 * @param transactions - Array of transactions
 * @returns Object with date as key and array of transactions as value
 */
export const groupTransactionsByDate = (transactions: Transaction[]) => {
  const sortedTransactions = sortTransactionsByDate(transactions);
  return sortedTransactions.reduce((acc, transaction) => {
    //Normalize the date to YYYY-MM-DD format
    const date = new Date(transaction.date).toISOString().split("T")[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(transaction);
    return acc;
  }, {} as Record<string, Transaction[]>);
};
