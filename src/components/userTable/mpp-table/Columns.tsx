'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

/* TODO:
 APPLY MORE TIGHT SCHEMA VALIDATION ON TABLE DATA IF POSSIBLE
 I.E, ENUMS
 */

const MPPTableTypeSchema = z.object({
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
});

type MPPTableType = z.infer<typeof MPPTableTypeSchema>;

export const Columns: ColumnDef<MPPTableType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'No',
    header: 'No',
    cell: ({ row }) => {
      const index = row.index + 1;
      return <div>{index}</div>;
    },
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
    accessorKey: 'isApproved',
    header: 'Approval Status',
    cell: ({ row }) => {
      const status = row.getValue('isApproved') as string;
      return <Badge>{status}</Badge>;
    },
  },
];
