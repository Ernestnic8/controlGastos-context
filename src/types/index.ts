export type Expense = {
    id: string;
    expenseName: string;
    amount: number;
    category: string;
    date: Date;
}

export type DraftExpense = Omit<Expense, 'id'>;

export type Category = {
    id: string;
    name: string;
    icon: string;
} 

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];