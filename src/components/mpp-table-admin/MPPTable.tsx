'use client';

import React, { FC } from 'react';
import { DataTable } from './DataTable';
import { Columns } from './Columns';
import SelectMonthViewModel from './viewModel/SelectMonth.viewModel';

const MPPTableAdmin: FC = () => {
  const { MPPData, isLoading } = SelectMonthViewModel();

  return (
    <div className='container mx-auto ml-[30px] py-10'>
      <DataTable columns={Columns} data={MPPData ?? []} isLoading={isLoading} />
    </div>
  );
};

export default MPPTableAdmin;
