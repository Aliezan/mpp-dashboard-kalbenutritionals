'use client';

import React, { FC } from 'react';
import { DataTable } from './DataTable';
import { Columns } from './Columns';
import ManageMPPViewModel from '../viewModel/ManageMPP.viewModel';

const MPPGapAdmin: FC = () => {
  const { MPPGapData, isLoadingMPPGapQuery } = ManageMPPViewModel();

  return (
    <div className='container mx-auto ml-[30px] py-10'>
      <DataTable
        columns={Columns}
        data={MPPGapData ?? []}
        isLoading={isLoadingMPPGapQuery}
      />
    </div>
  );
};

export default MPPGapAdmin;
