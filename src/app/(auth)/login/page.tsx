import { LoginForm, LoginFormContainer } from '@/components';
import React, { FC } from 'react';

const LoginPage: FC = () => (
  <section className='flex justify-between items-center'>
    <div className='border-r border-black min-h-screen flex justify-center items-center w-[768px]'>
      <h1 className='font-bold'>MPP Dashboard Kalbe Nutritionals</h1>
    </div>
    <div className='flex justify-center items-center w-[768px]'>
      <LoginFormContainer>
        <LoginForm />
      </LoginFormContainer>
    </div>
  </section>
);

export default LoginPage;
