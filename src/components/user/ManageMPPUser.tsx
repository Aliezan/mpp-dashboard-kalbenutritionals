import React, { FC } from 'react';
import { MPPTableUser, MPPGapUser, SelectMonth } from '@/components';

const ManageMPPUser: FC = () => (
  <div>
    <div className='flex justify-between'>
      <h1 className='font-bold text-[30px]'>Manage MPP</h1>
      <SelectMonth />
    </div>
    <MPPTableUser />
    <MPPGapUser />
  </div>
);

export default ManageMPPUser;
