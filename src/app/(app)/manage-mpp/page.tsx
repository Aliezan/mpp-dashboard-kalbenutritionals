/* eslint-disable no-nested-ternary */

import MPPTable from '@/components/mpp-table/MPPTable';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/server/auth';
import React, { FC } from 'react';
import MPPGap from '@/components/mpp-gap/MPPGap';
import ManageMPPAdmin from '@/components/admin/ManageMPPAdmin';

const ManageMPP: FC = async () => {
  const session = await getServerSession(authOptions);

  return (
    <section className='mt-[40px]'>
      <div className='w-full'>
        <div className='container px-20 mx-auto'>
          <div>
            {session?.user?.role === 'ADMIN' ? (
              <>
                <ManageMPPAdmin />
              </>
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
