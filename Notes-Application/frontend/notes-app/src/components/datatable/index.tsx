import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
  ColumnDef,
  Table as Tab,
} from "@tanstack/react-table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import { Input } from "../../components/ui/input";
import { FilterSelector } from "../filterSelector";
import { SelectDataTableColumns } from "../columnSelector";
import { TablePagination } from "../pagination";


interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  totalPages: number;
  page: number;
  onChange: (c: number) => void;
  editLink: string;
  size: number;
  filter?: string[];
  onFilterChange?: React.Dispatch<React.SetStateAction<string>>;
}
export function DataTable<TData>({
  columns,
  data,
  size,
  totalPages,
  page,
  onChange,
  editLink,
  filter,
  onFilterChange,
}: DataTableProps<TData>) {
  const [editing, setEditing] = useState<TData | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const table = useReactTable({
    data,
    columns,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });
  const navigate = useNavigate();

  const handleEditClick = (data: TData, link: string) => {
    navigate(link, { state: { data: data } });
    setEditing(data);
  };

  return (
    <>
      <div className="rounded-md border shadow-md">
        <div className="p-2 flex justify-start items-center">
          <div className="flex items-center gap-3">
            <Input
              type="text"
              placeholder="Search..."
              value={globalFilter ?? ""}
              onChange={(e: any) => setGlobalFilter(e.target.value)}
              className="w-60 rounded-3xl"
            />
            {filter && onFilterChange && (
              <FilterSelector list={filter} onChange={onFilterChange} />
            )}
            <SelectDataTableColumns tab={table} />
          </div>
        </div>
        <div>
          <div className="relative w-full overflow-auto max-h-[calc(100vh-17rem)]">
            <Table>
              <TableHeader className="sticky top-0 bg-secondary">
                <TableRow>
                  {table.getHeaderGroups()[0].headers.map((header) => (
                    <TableHead
                      key={header.id}
                      style={{ minWidth: header.column.columnDef?.size || 100 }}
                      className="border border-r-1"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    onDoubleClick={() =>
                      editLink !== ""
                        ? handleEditClick(row.original, editLink)
                        : () => {}
                    }
                    className={index % 2 === 0 ? "" : "bg-secondary"}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const meta = cell.column.columnDef.meta as {
                        type?: string;
                      };
                      return (
                        <TableCell
                          key={cell.id}
                          style={{
                            minWidth: cell.column.columnDef?.size || 100,
                          }}
                          className="border border-r-1"
                        >
                          {!cell.id.includes("index")
                            ? flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )
                            : index + 1 + size * page}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <TablePagination
          totalPages={totalPages}
          page={page}
          onPageChange={onChange}
        />
      </div>
    </>
  );
}
