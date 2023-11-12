/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import { ColumnDef } from '@tanstack/react-table';
import {
  ArrowUpDown,
  PenLine,
  MoreHorizontal,
  ArrowLeftRight,
  TrashIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';

const MPPTableTypeSchema = z.object({
  id: z.string().nullable(),
  Employee_ID: z.string().nullable(),
  Employee_Name: z.string().nullable(),
  Join_Date: z.string().nullable(),
  Job_Title_Name: z.string().nullable(),
  Org_Group_Name: z.string().nullable(),
  Job_Level_Code: z.string().nullable(),
  Category: z.string().nullable(),
  Status: z.string().nullable(),
  MPP: z.string().nullable(),
  Actual: z.string().nullable(),
  Gap: z.string().nullable(),
  isApproved: z.string().nullable(),
  createdAt: z.string().nullable(),
});

type MPPTableType = z.infer<typeof MPPTableTypeSchema>;

export const Columns: ColumnDef<MPPTableType>[] = [
  {
    accessorKey: 'Employee_ID',
    header: 'Employee ID',
  },
  {
    accessorKey: 'Employee_Name',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Employee Name
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
  },
  {
    accessorKey: 'Join_Date',
    header: 'Join Date',
    cell: ({ row }) => {
      const dateString = row.getValue('Join_Date') as string;
      const [day, month, year] = dateString.split('-').map(Number);
      const date = new Date(year + 2000, month - 1, day);
      const formattedDay = String(date.getDate()).padStart(2, '0');
      const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
      const formattedYear = date.getFullYear();
      const formatted = `${formattedDay}/${formattedMonth}/${formattedYear}`;
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: 'Job_Title_Name',
    header: 'Job Title Name',
  },
  {
    accessorKey: 'Org_Group_Name',
    header: 'Org Group Name',
  },
  {
    accessorKey: 'Job_Level_Code',
    header: 'Job Level Code',
  },
  {
    accessorKey: 'Category',
    header: 'Category',
  },
  {
    accessorKey: 'Status',
    header: 'Status',
  },
  {
    accessorKey: 'MPP',
    header: 'MPP',
  },
  {
    accessorKey: 'Actual',
    header: 'Actual',
  },
  {
    accessorKey: 'Gap',
    header: 'Gap',
  },
  {
    accessorKey: 'isApproved',
    header: 'Approval Status',
    cell: ({ row }) => {
      const status = row.getValue('isApproved') as string;
      return <Badge>{status}</Badge>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Last Modified
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'));
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      };
      const formatted = date.toLocaleDateString('id-ID', options);
      return <div>{formatted}</div>;
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    enableHiding: false,
    cell: ({ row }) => {
      const router = useRouter();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className='flex'>
                <PenLine size={20} className='mt-2' />
                <Button
                  variant='ghost'
                  onClick={() => {
                    const rowData = row.original;
                    router.push(
                      `/manage-mpp?MPPModal=y&formMode=edit&id=${encodeURIComponent(
                        rowData.id ?? '',
                      )}&EmployeeId=${encodeURIComponent(
                        rowData.Employee_ID ?? '',
                      )}&name=${encodeURIComponent(
                        rowData.Employee_Name ?? '',
                      )}&date=${encodeURIComponent(
                        rowData.Join_Date ?? '',
                      )}&title=${encodeURIComponent(
                        rowData.Job_Title_Name ?? '',
                      )}&OrgGroupName=${encodeURIComponent(
                        rowData.Org_Group_Name ?? '',
                      )}&JobLevelCode=${encodeURIComponent(
                        rowData.Job_Level_Code ?? '',
                      )}&Category=${encodeURIComponent(
                        rowData.Category ?? '',
                      )}&Status=${encodeURIComponent(rowData.Status ?? '')}`,
                    );
                  }}
                >
                  Edit MPP
                </Button>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className='flex'>
                <ArrowLeftRight size={20} className='mt-2' />
                <Button
                  variant='ghost'
                  onClick={() => {
                    const rowData = row.original;
                    router.push(
                      `/manage-mpp?MPPModal=y&formMode=move&id=${encodeURIComponent(
                        rowData.id ?? '',
                      )}&EmployeeId=${encodeURIComponent(
                        rowData.Employee_ID ?? '',
                      )}&name=${encodeURIComponent(
                        rowData.Employee_Name ?? '',
                      )}&date=${encodeURIComponent(
                        rowData.Join_Date ?? '',
                      )}&title=${encodeURIComponent(
                        rowData.Job_Title_Name ?? '',
                      )}&OrgGroupName=${encodeURIComponent(
                        rowData.Org_Group_Name ?? '',
                      )}&JobLevelCode=${encodeURIComponent(
                        rowData.Job_Level_Code ?? '',
                      )}&Category=${encodeURIComponent(
                        rowData.Category ?? '',
                      )}&Status=${encodeURIComponent(rowData.Status ?? '')}`,
                    );
                  }}
                >
                  Move to Another Org
                </Button>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className='flex'>
                <TrashIcon size={20} className='mt-2' />
                <Button
                  variant='ghost'
                  onClick={() => {
                    const rowData = row.original;
                    router.push(`/manage-mpp?MPPRowDelete=y&id=${rowData.id}`);
                  }}
                >
                  Delete MPP Row
                </Button>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
