import React, { FC } from 'react';
import MPPTableAdmin from '../mpp-table-admin/MPPTable';
import MPPGapAdmin from '../mpp-gap-admin/MPPGap';
import SelectMonth from '../mpp-table-admin/SelectMonth';

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
