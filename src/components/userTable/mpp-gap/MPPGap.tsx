'use client';

import React, { FC } from 'react';
import { DataTable } from './DataTable';
import { Columns } from './Columns';
import UserMPPViewModel from '../viewModel/UserMPPViewModel';

const MPPGap: FC = () => {
  const { MPPGapData, isLoadingUserMonthlyMPPGap } = UserMPPViewModel();
  return (
    <div className='container mx-auto ml-[30px] py-10'>
      <DataTable
        columns={Columns}
        data={MPPGapData ?? []}
        isLoading={isLoadingUserMonthlyMPPGap}
      />
    </div>
  );
};

export default MPPGap;
