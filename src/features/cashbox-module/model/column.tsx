import type { ColumnDef } from "@tanstack/react-table";

export type TransactionType = "Income" | "Expense";

export type Transaction = {
  id: symbol | string;
  date: Date | string;
  type: TransactionType;
  amount: number;
  category: string;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "categoryId",
    header: "Category",
  },
];
