import HomeContent from '@/components/layouts/HomeContent';
import React, { FC } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/server/auth';
import StatusMPP from '@/components/admin/StatusMPP';

const Home: FC = async () => {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <section className='mt-[40px]'>
        <HomeContent>
          <div className='w-full'>
            <div className='container px-20 mx-auto'>
              <div>
                <h1 className='font-bold text-[30px]'>Home</h1>
                <p>Selamat Datang {session?.user?.name}!</p>
                {session?.user?.role === 'ADMIN' ? (
                  <div className='flex mt-6'>
                    <StatusMPP />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </HomeContent>
      </section>
    </main>
  );
};
export default Home;
