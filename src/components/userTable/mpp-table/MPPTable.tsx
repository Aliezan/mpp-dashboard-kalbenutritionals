'use client';

import React, { FC } from 'react';
import { DataTable } from './DataTable';
import { Columns } from './Columns';
import UserMPPViewModel from '../viewModel/UserMPPViewModel';

const MPPTable: FC = () => {
  const { MPPData, isLoadingUserMonthlyMPP } = UserMPPViewModel();
  return (
    <div className='container mx-auto ml-[30px] py-10'>
      <DataTable
        columns={Columns}
        data={MPPData ?? []}
        isLoading={isLoadingUserMonthlyMPP}
      />
    </div>
  );
};

export default MPPTable;
