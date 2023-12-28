/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, PenLineIcon, MoreHorizontal, TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';

const MPPGapTypeSchema = z.object({
  id: z.string().nullable(),
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
                <PenLineIcon size={20} className='mt-2' />
                <Button
                  variant='ghost'
                  onClick={() => {
                    const rowData = row.original;
                    router.push(
                      `/manage-mpp?MPPModal=y&formMode=assign&id=${encodeURIComponent(
                        rowData.id ?? '',
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
                  Assign MPP
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
                    router.push(
                      `/manage-mpp?MPPRowDelete=y&id=${rowData.id}`,
                    );
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
