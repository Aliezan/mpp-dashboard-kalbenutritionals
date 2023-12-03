import React, { FC } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/server/auth';
import MPPSummaryAdmin from '@/components/admin/MPPSummaryAdmin';

const MPPSummary: FC = async () => {
  const session = await getServerSession(authOptions);

  return (
    <section className='mt-[40px]'>
      <div className='w-full'>
        <div className='container px-20 mx-auto'>
          {session?.user?.role === 'ADMIN' ? <MPPSummaryAdmin /> : null}
        </div>
      </div>
    </section>
  );
};

export default MPPSummary;
