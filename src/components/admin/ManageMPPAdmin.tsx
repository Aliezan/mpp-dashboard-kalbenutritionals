import React, { FC } from 'react';
import { MPPTableAdmin, MPPGapAdmin, SelectMonth } from '@/components';

const ManageMPPAdmin: FC = () => (
  <div>
    <div className='flex justify-between'>
      <h1 className='font-bold text-[30px]'>Manage MPP</h1>
      <SelectMonth />
    </div>
    <MPPTableAdmin />
    <MPPGapAdmin />
  </div>
);

export default ManageMPPAdmin;
