/* eslint-disable no-nested-ternary */

import { getServerSession } from 'next-auth';
import { authOptions } from '@/server/auth';
import React, { FC } from 'react';
import ManageMPPAdmin from '@/components/admin/ManageMPPAdmin';
import ManageMPPUser from '@/components/user/ManageMPPUser';

const ManageMPP: FC = async () => {
  const session = await getServerSession(authOptions);

  return (
    <section className='mt-[40px]'>
      <div className='w-full'>
        <div className='container px-20 mx-auto'>
          <div>
            {session?.user?.role === 'ADMIN' ? (
              <ManageMPPAdmin />
            ) : session?.user?.role === 'SUPER' ? (
              <p>MPP SUPER</p>
            ) : (
              <ManageMPPUser />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageMPP;
