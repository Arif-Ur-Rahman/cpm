"use client";

import * as React from "react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
} from "@tanstack/react-table";
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    ArrowUpDown,
    Plus,
    SlidersHorizontal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Issue = {
    id: string;
    title: string;
    type: string;
    status: "Open" | "In Progress" | "Resolved" | "Closed";
    priority: "Low" | "Medium" | "High" | "Critical";
    project: string;
    assignee: string;
};

const issues: Issue[] = [
    { id: "ISS-001", title: "Login page not loading on Safari", type: "Bug", status: "Open", priority: "High", project: "Web Portal", assignee: "Alice Johnson" },
    { id: "ISS-002", title: "Add export to CSV feature", type: "Feature", status: "In Progress", priority: "Medium", project: "Reports Module", assignee: "Bob Smith" },
    { id: "ISS-003", title: "Dashboard charts performance issue", type: "Performance", status: "In Progress", priority: "High", project: "Web Portal", assignee: "Carol White" },
    { id: "ISS-004", title: "Update user onboarding flow", type: "Improvement", status: "Open", priority: "Medium", project: "Onboarding", assignee: "David Lee" },
    { id: "ISS-005", title: "Fix broken email notifications", type: "Bug", status: "Resolved", priority: "Critical", project: "Notifications", assignee: "Eve Davis" },
    { id: "ISS-006", title: "Mobile responsive navbar", type: "Bug", status: "Resolved", priority: "Medium", project: "Web Portal", assignee: "Frank Brown" },
    { id: "ISS-007", title: "Add two-factor authentication", type: "Feature", status: "Open", priority: "High", project: "Security", assignee: "Grace Wilson" },
    { id: "ISS-008", title: "Database query optimization", type: "Performance", status: "In Progress", priority: "High", project: "Backend", assignee: "Henry Taylor" },
    { id: "ISS-009", title: "File upload size limit error", type: "Bug", status: "Resolved", priority: "Low", project: "Storage Module", assignee: "Isabella Martin" },
    { id: "ISS-010", title: "Implement dark mode", type: "Feature", status: "Open", priority: "Low", project: "Web Portal", assignee: "James Anderson" },
    { id: "ISS-011", title: "API rate limiting setup", type: "Feature", status: "In Progress", priority: "High", project: "Backend", assignee: "Karen Thomas" },
    { id: "ISS-012", title: "Fix pagination on projects list", type: "Bug", status: "Resolved", priority: "Medium", project: "Projects Module", assignee: "Liam Jackson" },
];

const statusVariant: Record<Issue["status"], "outline" | "default" | "secondary" | "destructive" | "success" | "warning"> = {
    Open: "outline",
    "In Progress": "warning",
    Resolved: "success",
    Closed: "secondary",
};

const priorityVariant: Record<Issue["priority"], "outline" | "default" | "secondary" | "destructive" | "success" | "warning"> = {
    Low: "secondary",
    Medium: "outline",
    High: "default",
    Critical: "destructive",
};

const columns: ColumnDef<Issue>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
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
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => (
            <span className="font-mono text-xs text-muted-foreground">
                {row.getValue("id")}
            </span>
        ),
    },
    {
        accessorKey: "title",
        header: ({ column }) => (
            <button
                className="flex items-center gap-1 text-left font-medium"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Title
                <ArrowUpDown className="h-3 w-3" />
            </button>
        ),
        cell: ({ row }) => (
            <span className="font-medium">{row.getValue("title")}</span>
        ),
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => (
            <Badge variant="outline" className="text-xs">
                {row.getValue("type")}
            </Badge>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as Issue["status"];
            return (
                <Badge variant={statusVariant[status]} className="text-xs">
                    {status}
                </Badge>
            );
        },
    },
    {
        accessorKey: "priority",
        header: "Priority",
        cell: ({ row }) => {
            const priority = row.getValue("priority") as Issue["priority"];
            return (
                <Badge variant={priorityVariant[priority]} className="text-xs">
                    {priority}
                </Badge>
            );
        },
    },
    {
        accessorKey: "project",
        header: "Project",
        cell: ({ row }) => (
            <span className="text-sm text-muted-foreground">
                {row.getValue("project")}
            </span>
        ),
    },
    {
        accessorKey: "assignee",
        header: "Assignee",
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                    {(row.getValue("assignee") as string).charAt(0)}
                </div>
                <span className="text-sm hidden lg:block">
                    {row.getValue("assignee")}
                </span>
            </div>
        ),
    },
];

export function DataTable() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 5,
    });

    const table = useReactTable({
        data: issues,
        columns,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <Tabs defaultValue="all" className="w-full flex flex-col gap-4">
            <div className="flex items-center justify-between px-4 lg:px-6">
                <TabsList>
                    <TabsTrigger value="all">All Issues</TabsTrigger>
                    <TabsTrigger value="open">Open</TabsTrigger>
                    <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                    <TabsTrigger value="resolved">Resolved</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <SlidersHorizontal className="h-4 w-4" />
                                <span className="hidden lg:inline ml-2">
                                    Columns
                                </span>
                                <ChevronDown className="h-4 w-4 ml-1" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                            {table
                                .getAllColumns()
                                .filter((col) => col.getCanHide())
                                .map((col) => (
                                    <DropdownMenuCheckboxItem
                                        key={col.id}
                                        className="capitalize"
                                        checked={col.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            col.toggleVisibility(!!value)
                                        }
                                    >
                                        {col.id}
                                    </DropdownMenuCheckboxItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button size="sm">
                        <Plus className="h-4 w-4" />
                        <span className="hidden lg:inline ml-2">New Issue</span>
                    </Button>
                </div>
            </div>

            <TabsContent
                value="all"
                className="flex flex-col gap-4 px-4 lg:px-6"
            >
                <IssueTable table={table} columns={columns} />
                <TablePagination table={table} />
            </TabsContent>
            <TabsContent
                value="open"
                className="flex flex-col gap-4 px-4 lg:px-6"
            >
                <FilteredTable
                    data={issues.filter((i) => i.status === "Open")}
                    columns={columns}
                />
            </TabsContent>
            <TabsContent
                value="in-progress"
                className="flex flex-col gap-4 px-4 lg:px-6"
            >
                <FilteredTable
                    data={issues.filter((i) => i.status === "In Progress")}
                    columns={columns}
                />
            </TabsContent>
            <TabsContent
                value="resolved"
                className="flex flex-col gap-4 px-4 lg:px-6"
            >
                <FilteredTable
                    data={issues.filter((i) => i.status === "Resolved")}
                    columns={columns}
                />
            </TabsContent>
        </Tabs>
    );
}

function IssueTable({
    table,
    columns,
}: {
    table: ReturnType<typeof useReactTable<Issue>>;
    columns: ColumnDef<Issue>[];
}) {
    return (
        <div className="overflow-hidden rounded-lg border">
            <Table>
                <TableHeader className="bg-muted/50">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={
                                    row.getIsSelected() && "selected"
                                }
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
                                className="h-24 text-center text-muted-foreground"
                            >
                                No issues found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

function FilteredTable({
    data,
    columns,
}: {
    data: Issue[];
    columns: ColumnDef<Issue>[];
}) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="overflow-hidden rounded-lg border">
            <Table>
                <TableHeader className="bg-muted/50">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
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
                                className="h-24 text-center text-muted-foreground"
                            >
                                No issues found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

function TablePagination({
    table,
}: {
    table: ReturnType<typeof useReactTable<Issue>>;
}) {
    return (
        <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground hidden lg:block">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected
            </div>
            <div className="flex items-center gap-4 ml-auto">
                <div className="hidden items-center gap-2 lg:flex">
                    <span className="text-sm font-medium">Rows per page</span>
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) =>
                            table.setPageSize(Number(value))
                        }
                    >
                        <SelectTrigger className="h-8 w-16">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[5, 10, 20].map((size) => (
                                <SelectItem key={size} value={`${size}`}>
                                    {size}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <span className="text-sm font-medium">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                </span>
                <div className="flex items-center gap-1">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 hidden lg:flex"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 hidden lg:flex"
                        onClick={() =>
                            table.setPageIndex(table.getPageCount() - 1)
                        }
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
