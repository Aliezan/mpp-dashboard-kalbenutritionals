'use client';

import { trpc } from '@/app/_trpc/client';
import React, { FC } from 'react';
import { DataTable } from './DataTable';
import { Columns } from './Columns';

const MPPTable: FC = () => {
  const { tableRouter } = trpc;
  const { data: TableData, isLoading } = tableRouter.getMPP.useQuery();
  
  return (
    <div className='container mx-auto ml-[30px] py-10'>
      <DataTable
        columns={Columns}
        data={TableData ?? []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default MPPTable;
