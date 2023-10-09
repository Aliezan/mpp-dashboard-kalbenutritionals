'use client';

import { trpc } from '@/app/_trpc/client';
import React, { FC } from 'react';
import { DataTable } from './DataTable';
import { Columns } from './Columns';

const MPPTable: FC = () => {
  const { tableRouter } = trpc;
  const { data: TableData } = tableRouter.getTableMPP.useQuery();
  return (
    <div className='container mx-auto py-10'>
      <DataTable columns={Columns} data={TableData ?? []} />
    </div>
  );
};

export default MPPTable;
