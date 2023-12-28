'use client';

import React, { FC } from 'react';
import { trpc } from '@/app/_trpc/client';
import { DataTable } from './DataTable';
import { Columns } from './Columns';

const UsersList: FC = () => {
  const { data: UsersData, isLoading } = trpc.adminRouter.getUsers.useQuery();
  return (
    <div className='container mx-auto ml-[30px] py-10'>
      <DataTable
        columns={Columns}
        data={UsersData ?? []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default UsersList;
