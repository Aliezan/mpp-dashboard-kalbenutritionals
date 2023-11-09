'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { z } from 'zod';

const MPPGapTypeSchema = z.object({
  Org_Group_Name: z.string().nullable(),
  Job_Title_Name: z.string().nullable(),
  Job_Level_Code: z.string().nullable(),
  Category: z.string().nullable(),
  Status: z.string().nullable(),
  MPP: z.string().nullable(),
  Actual: z.string().nullable(),
  Gap: z.string().nullable(),
});

type MPPGapType = z.infer<typeof MPPGapTypeSchema>;

export const Columns: ColumnDef<MPPGapType>[] = [
  {
    accessorKey: 'Org_Group_Name',
    header: 'Org Group Name',
  },
  {
    accessorKey: 'Job_Title_Name',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Job Title Name
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
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
];
