import { LoginForm, LoginFormContainer } from '@/components';
import React, { FC } from 'react';

const LoginPage: FC = () => (
  <main>
    <section className='flex justify-between items-center min-h-screen'>
      <div className='border-r border-black min-h-screen flex justify-center items-center w-[768px]'>
        <h1 className='font-bold'>MPP Dashboard Kalbe Nutritionals</h1>
      </div>
      <div className='flex justify-center items-center w-[768px]'>
        <LoginFormContainer>
          <LoginForm />
        </LoginFormContainer>
      </div>
    </section>
  </main>
);

export default LoginPage;
