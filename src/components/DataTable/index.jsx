import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "../ui/skeleton";
import DataTablePagination from "./pagination";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "first_name",
    header: () => <div className="text-neutral-900 text-sm">First Name</div>,
    cell: ({ row }) => (
      <div className="text-neutral-900 text-sm">
        {row.getValue("first_name")}
      </div>
    ),
  },
  {
    accessorKey: "last_name",
    header: () => <div className="text-neutral-900 text-sm">Last Name</div>,
    cell: ({ row }) => (
      <div className="text-neutral-900 text-sm">
        {row.getValue("last_name")}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: () => <div className="text-neutral-900 text-sm">Email</div>,
    cell: ({ row }) => (
      <div className="text-neutral-900 text-sm">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "country_code",
    header: () => <div className="text-neutral-900 text-sm">Country Code</div>,
    cell: ({ row }) => (
      <div className="text-neutral-900 text-sm">
        {row.getValue("country_code")}
      </div>
    ),
  },
  {
    accessorKey: "phone_no",
    header: () => <div className="text-neutral-900 text-sm">Phone Number</div>,
    cell: ({ row }) => (
      <div className="text-neutral-900 text-sm">{row.getValue("phone_no")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-neutral-900 text-sm">Status</div>,
    cell: ({ row }) => (
      <div className="text-neutral-900 text-sm">{row.getValue("status")}</div>
    ),
  },
];

export default function DataTable({ data, loading }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: data?.userList || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 4,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between">
          <Skeleton className="h-14 w-96" />
          <Skeleton className="h-14 w-36" />
        </div>
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  return (
    <Card className="px-6 py-3">
      <h3 className="text-lg text-black font-semibold">Recent Users</h3>
      <Separator className="mt-3 mb-1" />
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter names..."
            value={table.getColumn("first_name")?.getFilterValue() || ""}
            onChange={(event) =>
              table.getColumn("first_name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm bg-gray-50 shadow-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-[#EBF3FF]">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
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
        <div className="mt-4">
          <DataTablePagination table={table} />
        </div>
      </div>
    </Card>
  );
}
