import TableActions from "@/Features/Recruitment/Components/Interview/TableActions";
import TableColumnHeader from "@/Features/Recruitment/Components/Interview/TableColumnHeader";
import type { IInterviewCandidate } from "@/Features/Recruitment/types/interview.type";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Check, X } from "lucide-react";

export const interviewTableColumns: ColumnDef<IInterviewCandidate>[] = [
  {
    accessorKey: "sl",
    header: "SL",
    cell: ({ row }) => row.index + 1,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "name",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Name" />
    ),
    cell: ({ row }) => (
      <div className="px-3">
        {row.original.firstName} {row.original.lastName}
      </div>
    ),
  },
  {
    accessorKey: "interview",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Interview" />
    ),
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
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Job Position" />
    ),
    cell: ({ row }) => <div className="px-3">{row.getValue("position")}</div>,
  },
  {
    accessorKey: "interviewDate",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Interview Date" />
    ),
    cell: ({ row }) => (
      <div className="px-3">
        {format(row.getValue("interviewDate"), "hh:mm a; do MMM yyyy")}
      </div>
    ),
  },
  {
    accessorKey: "vivaMarks",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Viva Marks" />
    ),
    cell: ({ row }) => <div className="px-3">{row.getValue("vivaMarks")}</div>,
  },
  {
    accessorKey: "writtenTotalMarks",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Written Total Marks" />
    ),
    cell: ({ row }) => (
      <div className="px-3">{row.getValue("writtenTotalMarks")}</div>
    ),
  },
  {
    accessorKey: "mcqTotalMarks",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="MCQ Total Marks" />
    ),
    cell: ({ row }) => (
      <div className="px-3">{row.getValue("mcqTotalMarks")}</div>
    ),
  },
  {
    accessorKey: "totalMarks",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Total Marks" />
    ),
    cell: ({ row }) => <div className="px-3">{row.getValue("totalMarks")}</div>,
  },
  {
    accessorKey: "selection",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Selection" />
    ),
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
