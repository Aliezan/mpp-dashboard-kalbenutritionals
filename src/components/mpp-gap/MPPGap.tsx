'use client';

import React, { FC } from 'react';
import { trpc } from '@/app/_trpc/client';
import { DataTable } from './DataTable';
import { Columns } from './Columns';

const MPPGap: FC = () => {
  const { tableRouter } = trpc;
  const { data: GapTable, isLoading } = tableRouter.getMPPGap.useQuery();

  return (
    <div className='container mx-auto ml-[30px] py-10'>
      <DataTable
        columns={Columns}
        data={GapTable ?? []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default MPPGap;
