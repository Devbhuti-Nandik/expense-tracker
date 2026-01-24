export type Transaction = {
    id: string;
    title: string;
    amount: number;
    type: 'income' | 'expense';
    date: Date;
    createdAt: Date;
}