import { DataTable } from "@/shared/ui/data-table";
import { columns, type Transaction } from "../model/column";
import { useOutletContext } from "react-router";
import type { LayoutCtx } from "@/app/layouts/app-layout";
import { useEffect } from "react";
import { format } from "date-fns";

export const CashboxTable = () => {
  const { setHeaderTitle } = useOutletContext<LayoutCtx>();

  useEffect(() => {
    setHeaderTitle("Cashbox");
    return () => setHeaderTitle(null);
  }, [setHeaderTitle]);

  const users: Transaction[] = [
    {
      id: "1",
      date: format(new Date("2024-01-01 10:00"), "dd.MM.yyyy / HH:mm"),
      type: "Income",
      amount: 1000,
      category: "Salary",
    },
    {
      id: "2",
      date: format(new Date("2024-01-02 12:34"), "dd.MM.yyyy / HH:mm"),
      type: "Expense",
      amount: 200,
      category: "Groceries",
    },
    {
      id: "3",
      date: format(new Date("2024-01-03 13:00"), "dd.MM.yyyy / HH:mm"),
      type: "Expense",
      amount: 150,
      category: "Transport",
    },
    {
      id: "3",
      date: format(new Date("2024-01-03 13:00"), "dd.MM.yyyy / HH:mm"),
      type: "Expense",
      amount: 150,
      category: "Transport",
    },
  ];

  return <DataTable columns={columns} data={users} />;
};
