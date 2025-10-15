import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import TableActions from "@/Features/Recruitment/Components/Interview/TableActions";
import type { IInterviewCandidate } from "@/Features/Recruitment/types/interview.type";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown, Check, X } from "lucide-react";

export const interviewTableColumns: ColumnDef<IInterviewCandidate>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
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
    id: "name",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="px-3">
        {row.original.firstName} {row.original.lastName}
      </div>
    ),
  },
  {
    accessorKey: "interview",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Interview
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="px-3">
        {row.getValue("interview") ? (
          <Check color="green" />
        ) : (
          <X color="red" />
        )}
      </div>
    ),
  },
  {
    accessorKey: "position",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Job Position
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="px-3">{row.getValue("position")}</div>,
  },
  {
    accessorKey: "interviewDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Interview Date
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="px-3">
        {format(row.getValue("interviewDate"), "hh:mm a; do MMM yyyy")}
      </div>
    ),
  },
  {
    accessorKey: "vivaMarks",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Viva Marks
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="px-3">{row.getValue("vivaMarks")}</div>,
  },
  {
    accessorKey: "writtenTotalMarks",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Written Total Marks
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="px-3">{row.getValue("writtenTotalMarks")}</div>
    ),
  },
  {
    accessorKey: "mcqTotalMarks",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          MCQ Total Marks
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="px-3">{row.getValue("mcqTotalMarks")}</div>
    ),
  },
  {
    accessorKey: "totalMarks",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Marks
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="px-3">{row.getValue("totalMarks")}</div>,
  },
  {
    accessorKey: "selection",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Selection
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="px-3">
        {row.getValue("selection") ? (
          <Check color="green" />
        ) : (
          <X color="red" />
        )}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const { candidateId } = row.original;
      return <TableActions candidateId={candidateId} />;
    },
  },
];
