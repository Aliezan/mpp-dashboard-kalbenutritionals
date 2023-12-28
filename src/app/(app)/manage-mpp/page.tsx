/* eslint-disable no-nested-ternary */

import { getServerSession } from 'next-auth';
import { authOptions } from '@/server/auth';
import React, { FC } from 'react';
import ManageMPPAdmin from '@/components/admin/ManageMPPAdmin';
import ManageMPPUser from '@/components/user/ManageMPPUser';
import MPPModal from '@/components/admin/MPPModal';
import DeleteMPPModal from '@/components/admin/DeleteMPPModal';

const ManageMPP: FC = async () => {
  const session = await getServerSession(authOptions);

  return (
    <section className='mt-[40px]'>
      <MPPModal />
      <DeleteMPPModal />
      <div className='w-full'>
        <div className='container px-20 mx-auto'>
          {session?.user?.role === 'ADMIN' ? (
            <ManageMPPAdmin />
          ) : session?.user?.role === 'SUPER' ? (
            <ManageMPPAdmin />
          ) : (
            <ManageMPPUser />
          )}
        </div>
      </div>
    </section>
  );
};

export default ManageMPP;
