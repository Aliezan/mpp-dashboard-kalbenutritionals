/* eslint-disable no-nested-ternary */

import React, { FC } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/server/auth';
import { StatusMPP, DataInput } from '@/components';

const Home: FC = async () => {
  const session = await getServerSession(authOptions);

  return (
    <section className='mt-[40px]'>
      <div className='w-full'>
        <div className='container px-20 mx-auto'>
          <div>
            <h1 className='font-bold text-[30px]'>Home</h1>
            <p>Selamat Datang {session?.user?.name}!</p>
            {session?.user?.role === 'ADMIN' ? (
              <div className='flex mt-6 gap-3'>
                <StatusMPP />
                <DataInput />
              </div>
            ) : session?.user?.role === 'SUPER' ? (
              <div className='flex mt-6 gap-3'>
                <StatusMPP />
                <DataInput />
              </div>
            ) : (
              <h1>USER</h1>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Home;
