'use client';

import React, { FC } from 'react';
import { DataTable } from './DataTable';
import { Columns } from './Columns';
import ManageMPPViewModel from '../viewModel/ManageMPP.viewModel';

const MPPTableAdmin: FC = () => {
  const { MPPData, isLoadingMPPQuery } = ManageMPPViewModel();

  return (
    <div className='container mx-auto ml-[30px] py-10'>
      <DataTable
        columns={Columns}
        data={MPPData ?? []}
        isLoading={isLoadingMPPQuery}
      />
    </div>
  );
};

export default MPPTableAdmin;
