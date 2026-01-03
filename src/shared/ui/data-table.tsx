import * as React from "react";
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/shadcn/table";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  toolbar?: (table: ReturnType<typeof useReactTable<TData>>) => React.ReactNode;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  toolbar,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 20 } },

    // ✅ sizing barqaror bo'lishi uchun
    columnResizeMode: "onChange",
    // (siz resizer ishlatmasangiz ham foydali)
  });

  // ✅ Table sig'masa scroll bo'lishi uchun minWidth ni column size yig'indisidan olamiz
  const tableMinWidth = React.useMemo(() => {
    return table
      .getAllLeafColumns()
      .reduce((sum, col) => sum + col.getSize(), 0);
  }, [table]);

  return (
    <div className="flex min-h-0 h-full flex-col gap-3">
      {toolbar ? toolbar(table) : null}

      <div className="flex-1 min-h-0 rounded-lg border overflow-hidden bg-background">
        {/* Scroll container */}
        <div className="relative h-full w-full overflow-auto">
          {/* MUHIM: table w-max bo'lsin, shunda containerga siqilmaydi */}
          <Table
            className="w-full table-fixed border-separate border-spacing-0"
            style={{ minWidth: tableMinWidth }}
          >
            <TableHeader className="bg-[#e0e0e0]">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const canSort = header.column.getCanSort();
                    const sortDir = header.column.getIsSorted();
                    const isActions = header.column.id === "actions";

                    return (
                      <TableHead
                        key={header.id}
                        style={{ width: header.column.getSize() }}
                        className={[
                          "whitespace-nowrap",
                          isActions
                            ? "sticky right-0 z-30 bg-[#e0e0e0] border-l"
                            : "",
                        ].join(" ")}
                      >
                        <button
                          type="button"
                          className={`inline-flex items-center gap-1 ${
                            canSort ? "select-none" : ""
                          }`}
                          onClick={
                            canSort
                              ? header.column.getToggleSortingHandler()
                              : undefined
                          }
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}

                          {canSort && (
                            <span className="text-xs opacity-70">
                              {sortDir === "asc"
                                ? "▲"
                                : sortDir === "desc"
                                ? "▼"
                                : ""}
                            </span>
                          )}
                        </button>
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className="hover:bg-muted/40">
                    {row.getVisibleCells().map((cell) => {
                      const isActions = cell.column.id === "actions";

                      return (
                        <TableCell
                          key={cell.id}
                          style={{ width: cell.column.getSize() }}
                          className={[
                            "align-middle whitespace-nowrap",
                            isActions
                              ? "sticky right-0 z-20 bg-background border-l shadow-[-6px_0_12px_-12px_rgba(0,0,0,0.6)]"
                              : "",
                          ].join(" ")}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination (siz keyin dynamic qilasiz) */}
      <div className="flex items-center justify-between">
        <div className="text-sm opacity-70">
          Rows: {table.getFilteredRowModel().rows.length}
        </div>
      </div>
    </div>
  );
}
