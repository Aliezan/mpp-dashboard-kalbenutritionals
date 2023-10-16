/* eslint-disable no-nested-ternary */

import MPPTable from '@/components/mpp-table/MPPTable';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/server/auth';
import React, { FC } from 'react';
import MPPGap from '@/components/mpp-gap/MPPGap';

const ManageMPP: FC = async () => {
  const session = await getServerSession(authOptions);

  return (
    <section className='mt-[40px]'>
      <div className='w-full'>
        <div className='container px-20 mx-auto'>
          <div>
            <h1 className='font-bold text-[30px]'>Manage MPP</h1>
            {session?.user?.role === 'ADMIN' ? (
              <p>Input data MPP yang telah disetujui</p>
            ) : session?.user?.role === 'SUPER' ? (
              <p>MPP SUPER</p>
            ) : (
              <>
                <p>Lihat dan Periksa MPP</p>
                <MPPTable />
                <MPPGap />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageMPP;
