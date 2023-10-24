/* eslint-disable no-nested-ternary */

'use client';

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import MutationsHandler from './Handler/mutations';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
}

export const DataTable = <TData, TValue>({
  columns,
  data,
  isLoading,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  const { approveMPP, rejectMPP } = MutationsHandler();

  const getSelectedRow = table
    .getSelectedRowModel()
    .rows.map((row) => (row.original as { Employee_ID: string }).Employee_ID);

  const handleApprove = () => {
    approveMPP.mutate({ ids: getSelectedRow });
  };

  const handleReject = () => {
    rejectMPP.mutate({ ids: getSelectedRow });
  };

  return (
    <div>
      <div>
        <h1 className='font-bold'>MPP Actual Data</h1>
      </div>
      <div className='flex items-center py-4 gap-4'>
        <Input
          placeholder='Cari Nama Employee'
          value={
            (table.getColumn('Employee_Name')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('Employee_Name')?.setFilterValue(event.target.value)
          }
          className='w-[300px]'
        />
        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <>
            <div className='flex-1 text-sm text-muted-foreground'>
              {table.getFilteredSelectedRowModel().rows.length} of{' '}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            {table
              .getFilteredSelectedRowModel()
              .rows.every((row) => row.getValue('isApproved') === 'APPROVED') ? (
              <Button
                variant='destructive'
                onClick={handleReject}
                disabled={rejectMPP.isLoading}
              >
                REJECT
              </Button>
            ) : (
              <Button onClick={handleApprove} disabled={approveMPP.isLoading}>
                APPROVE
              </Button>
            )}
          </>
        )}
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  <div className='space-y-2'>
                    <Skeleton className='w-full h-[10px]' />
                    <Skeleton className='w-full h-[10px]' />
                    <Skeleton className='w-full h-[10px]' />
                    <Skeleton className='w-full h-[10px]' />
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={
                    row.getValue('isApproved') === 'PENDING'
                      ? 'bg-yellow-100 dark:bg-yellow-800'
                      : row.getValue('isApproved') === 'REJECTED'
                      ? 'bg-red-100 dark:bg-red-800'
                      : ''
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  Tidak ada Data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex gap-1'>
          <p className='text-[15px]'>Page</p>
          <p className='text-[15px] font-bold'>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </p>
        </div>

        <div className='flex items-center space-x-2 py-4'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
