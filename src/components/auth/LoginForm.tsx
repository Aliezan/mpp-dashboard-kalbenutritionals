'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { FC } from 'react';
import LoginFormViewModel from '@/components/auth/viewModel/LoginForm.viewModel';

const LoginForm: FC = () => {
  const { register, handleSubmit, onSubmit, errors } = LoginFormViewModel();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mt-2'>
      <div className='mb-2'>
        <Label
          className={errors.email ? 'text-red-700 mb-1' : ''}
          htmlFor='email'
        >
          E-mail
        </Label>
        <Input
          {...register('email')}
          placeholder='Masukkan email anda'
          className={errors.email ? 'border-red-700 mt-2' : 'mt-2'}
        />
        {errors.email && (
          <p className='text-red-700 text-sm mt-1'>{errors.email.message}</p>
        )}
      </div>
      <div className='mt-4'>
        <Label
          className={errors.password ? 'text-red-700 mb-1' : ''}
          htmlFor='password'
        >
          Password
        </Label>
        <Input
          {...register('password')}
          type='password'
          placeholder='Masukkan password'
          className={errors.password ? 'border-red-700 mt-2' : 'mt-2'}
        />
        {errors.password && (
          <p className='text-red-700 text-sm mt-1'>{errors.password.message}</p>
        )}
      </div>
      <Button type='submit' className='mt-4'>
        Submit
      </Button>
    </form>
  );
};

export default LoginForm;
