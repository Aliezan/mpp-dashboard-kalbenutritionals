'use client';

import React, { FC } from 'react';
import { Modal } from '@/components';
import { Info } from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CardContent } from '../ui/card';
import { Button } from '../ui/button';
import UserModalViewModel from './viewModel/UserModal.viewModel';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

const UserModal: FC = () => {
  const { form, onSubmit, errors, formMode, MPPOrganisations } =
    UserModalViewModel();

  return (
    <Modal
      title={formMode === 'add' ? 'Add User' : 'Edit User'}
      closeURL='/manage-users'
      triggerURL='userModal'
    >
      <CardContent>
        <div className='flex gap-2'>
          {formMode === 'add' ? (
            <>
              <Info size={20} />
              <p className='text-slate-400 text-[13px]'>
                Isi form untuk menambahkan user
              </p>
            </>
          ) : (
            <p className='text-slate-400 text-[13px]'>
              Isi form untuk mengedit existing user
            </p>
          )}
        </div>
        <Form {...form}>
          <form
            className='space-y-4 mt-4'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className='flex gap-9'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name of User</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Isi nama user'
                        {...field}
                        className={errors.name ? 'border-red-700 mt-2' : 'mt-2'}
                      />
                    </FormControl>
                    {errors.name && (
                      <FormDescription className='text-red-700 text-sm mt-1'>
                        {errors.name.message}
                      </FormDescription>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email of User</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Isi email user'
                        {...field}
                        className={
                          errors.email ? 'border-red-700 mt-2' : 'mt-2'
                        }
                      />
                    </FormControl>
                    {errors.email && (
                      <FormDescription className='text-red-700 text-sm mt-1'>
                        {errors.email.message}
                      </FormDescription>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem className='space-y-3'>
                  <FormLabel>Pilih Role</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className='flex flex-col space-y-1'
                    >
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='USER' />
                        </FormControl>
                        <FormLabel className='font-normal'>User</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='ADMIN' />
                        </FormControl>
                        <FormLabel className='font-normal'>Admin</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='SUPER' />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          Super Admin
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='OrgGroupName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Group Name</FormLabel>
                  <FormControl>
                    <select
                      className='w-[180px] border border-black block'
                      onChange={field.onChange}
                      value={field.value}
                    >
                      {MPPOrganisations?.map((item) => (
                        <option value={item.Org_Group_Name ?? ''} key={item.id}>
                          {item.Org_Group_Name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Isi password user'
                      type='password'
                      className={
                        errors.password
                          ? 'border-red-700 mt-2 w-[300px]'
                          : 'mt-2 w-[300px]'
                      }
                      {...field}
                    />
                  </FormControl>
                  {errors.password && (
                    <FormDescription className='text-red-700 text-sm mt-1'>
                      {errors.password?.message}
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />
            <Button type='submit' className='mt-4'>
              {formMode === 'edit' ? 'Edit User' : 'Tambahkan User'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Modal>
  );
};

export default UserModal;
