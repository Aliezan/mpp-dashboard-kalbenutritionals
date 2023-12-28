/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import { ColumnDef } from '@tanstack/react-table';
import {
  ArrowUpDown,
  MoreHorizontal,
  TrashIcon,
  PenLineIcon,
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

const UsersSchema = z.object({
  id: z.string().nullable(),
  email: z.string().nullable(),
  name: z.string().nullable(),
  role: z.string().nullable(),
  Org_Group_Name: z.string().nullable(),
  createdAt: z.string().nullable(),
});

type UsersSchemaType = z.infer<typeof UsersSchema>;

export const Columns: ColumnDef<UsersSchemaType>[] = [
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Name
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const status = row.getValue('role') as string;
      return <Badge>{status}</Badge>;
    },
  },
  {
    accessorKey: 'Org_Group_Name',
    header: 'Org Group Name',
    cell: ({ row }) => {
      const GroupName = row.getValue('Org_Group_Name') as string;
      return <span className='font-bold'>{GroupName}</span>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created at',
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
                <PenLineIcon size={20} className='mt-2' />
                <Button
                  variant='ghost'
                  onClick={() => {
                    const rowData = row.original;
                    router.push(
                      `/manage-users?userModal=y&formMode=edit&id=${rowData.id}&email=${rowData.email}&name=${rowData.name}&role=${rowData.role}&OrgGroupName=${rowData.Org_Group_Name}`,
                    );
                  }}
                >
                  Edit User
                </Button>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className='flex'>
                <TrashIcon size={20} className='mt-2' />
                <Button
                  variant='ghost'
                  onClick={() => {
                    const selectedEmail = row.getValue('email') as string;
                    router.push(
                      `/manage-users?deleteConfirmation=y&email=${selectedEmail}`,
                    );
                  }}
                >
                  Delete User
                </Button>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
