import type { ColumnDef } from "@tanstack/react-table";

import { WalletActions } from "../ui/wallet-actions";
import type { WalletType } from "@/entities/control-panel-module/model/types";

export type TransactionType = "Income" | "Expense";

export const columns: ColumnDef<WalletType>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
    size: 140,
    minSize: 140,
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 240,
    minSize: 240,
  },
  {
    accessorKey: "currency",
    header: "Currency",
    size: 100,
    minSize: 100,
  },
  {
    accessorKey: "balance",
    header: "Balance",
    size: 140,
    minSize: 140,
  },
  {
    id: "actions",
    size: 30,
    minSize: 30,
    enableHiding: false,
    cell: ({ row }) => <WalletActions row={row} />,
  },
];
