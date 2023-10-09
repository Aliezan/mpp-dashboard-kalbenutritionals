'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  // DropdownMenuItem,
  DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

/* TODO:
 * APPLY MORE TIGHT SCHEMA VALIDATION ON TABLE DATA IF POSSIBLE
 */

interface MPPTableType {
  MPP: number | null;
  id: string | null;
  Employee_ID: string | null;
  Employee_Name: string | null;
  Join_Date: string | null;
  Job_Title_Name: string | null;
  Org_Group_Name: string | null;
  Job_Level_Code: string | null;
  Category: string | null;
  Status: string | null;
  Actual: number | null;
  Gap: number | null;
}

export const Columns: ColumnDef<MPPTableType>[] = [
  {
    accessorKey: 'No',
    header: 'No',
  },
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
      const date = new Date(row.getValue('Join_Date'));
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
    id: 'actions',
    cell: () => (
      // const mpp = row.original;

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
