import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ConfirmDeleteDialog from "@/Features/Recruitment/Components/Interview/ConfirmDeleteDialog";
import EditInterviewForm from "@/Features/Recruitment/Components/Interview/EditInterviewForm";
import SearchData from "@/Features/Recruitment/Components/Interview/SearchData";
import ShowEntries from "@/Features/Recruitment/Components/Interview/ShowEntries";
import { interviewTableColumns } from "@/Features/Recruitment/Components/Interview/TableColumns";
import TablePagination from "@/Features/Recruitment/Components/Interview/TablePagination";
import {
  deleteInterview,
  removeInterviewDeleteId,
  selectInterviewData,
  updateTableState,
} from "@/Features/Recruitment/recruitmentSlices/Interview.slice";
import type { IInterviewCandidate } from "@/Features/Recruitment/types/interview.type";
import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type TableState,
} from "@tanstack/react-table";

const InterviewTable = () => {
  const { interviewCandidates, tableState, interviewDeleteId } =
    useAppSelector(selectInterviewData);
  const dispatch = useAppDispatch();

  const table = useReactTable<IInterviewCandidate>({
    data: interviewCandidates,
    columns: interviewTableColumns,
    onSortingChange: (updater) =>
      dispatch(updateTableState({ key: "sorting", updater })),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: (updater) =>
      dispatch(updateTableState({ key: "rowSelection", updater })),
    onPaginationChange: (updater) =>
      dispatch(updateTableState({ key: "pagination", updater })),
    onGlobalFilterChange: (updater) =>
      dispatch(updateTableState({ key: "globalFilter", updater })),
    state: tableState as unknown as Partial<TableState>,
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <ShowEntries table={table} />
        <SearchData table={table} />
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
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
                  colSpan={interviewTableColumns.length}
                  className="h-10 text-center bg-[#F4F4F5]"
                >
                  No results found!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination table={table} />
      <ConfirmDeleteDialog
        open={!!interviewDeleteId}
        onOpenChange={(open: boolean) => {
          if (!open) {
            dispatch(removeInterviewDeleteId());
          }
        }}
        onConfirm={() => dispatch(deleteInterview())}
      />
      <EditInterviewForm />
    </div>
  );
};

export default InterviewTable;
