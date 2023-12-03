'use client';

import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';

const MPPSumAdminSchema = z.object({
  Status: z.string().nullable(),
  Job_Title_Name: z.string().nullable(),
  Sum_MPP: z.string().nullable(),
  Sum_Actual: z.string().nullable(),
  Sum_Gap: z.string().nullable(),
});

type MPPSumAdminType = z.infer<typeof MPPSumAdminSchema>;

export const Columns: ColumnDef<MPPSumAdminType>[] = [
  {
    accessorKey: 'Status',
    header: 'Status',
    enableGrouping: true,
    aggregationFn: 'unique',
  },
  {
    accessorKey: 'Job_Title_Name',
    header: 'Job Title Name',
  },
  {
    accessorKey: 'Sum_MPP',
    header: 'Sum MPP',
  },
  {
    accessorKey: 'Sum_Actual',
    header: 'Sum Actual',
  },
  {
    accessorKey: 'Sum_Gap',
    header: 'Sum Gap',
  },
];
