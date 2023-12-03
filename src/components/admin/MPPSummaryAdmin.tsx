import React, { FC } from 'react';
import { SelectMonth } from '@/components';
import MPPSumAdminTable from '../adminTable/mpp-sum-admin/MPPSumAdminTable';

const MPPSummaryAdmin: FC = () => (
  <div>
    <div className='flex justify-between'>
      <h1 className='font-bold text-[30px]'>MPP Summary</h1>
      <SelectMonth />
    </div>
    <MPPSumAdminTable />
  </div>
);

export default MPPSummaryAdmin;
