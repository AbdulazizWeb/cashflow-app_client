import type { ColumnDef } from "@tanstack/react-table";

export type TransactionType = "Income" | "Expense";
export type CurrencyType = "USD" | "UZS";

export type Wallet = {
  id: symbol | string;
  name: string;
  currency: CurrencyType;
  balance: number;
};

export const columns: ColumnDef<Wallet>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    accessorKey: "balance",
    header: "Balance",
  },
];
