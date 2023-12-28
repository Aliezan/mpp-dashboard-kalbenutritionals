'use client';

import React, { FC } from 'react';
import { DataTable } from './DataTable';
import { Columns } from './Columns';
import MPPSumAdminViewModel from '../viewModel/MPPSumAdmin.viewModel';

const MPPSumAdminTable: FC = () => {
  const { TableData } = MPPSumAdminViewModel();

  return (
    <div className='container mx-auto ml-[30px] py-10'>
      <DataTable columns={Columns} data={TableData ?? []} />
    </div>
  );
};

export default MPPSumAdminTable;
