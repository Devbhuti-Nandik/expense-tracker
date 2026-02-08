import { Transaction } from "../types/transaction";

export const sanitizeTransactionFormData = (transaction: Transaction) => {
  const { amount, date, category, description, type } = transaction;
  return {
    id: Math.random().toString(36).substring(2, 9),
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
