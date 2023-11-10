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
import MPPModalViewModel from './viewModel/MPPModal.viewModel';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

const MPPModal: FC = () => {
  const { form, errors, MPPOrganisations, onSubmit, dirtyFields, isFormDirty } =
    MPPModalViewModel();

  return (
    <Modal title='Edit MPP' closeURL='/manage-mpp' triggerURL='MPPModal'>
      <CardContent>
        <div className='flex gap-2'>
          <Info size={20} />
          <p className='text-slate-400 text-[13px]'>Edit Data MPP</p>
        </div>
        <Form {...form}>
          <form
            className='space-y-4 mt-4'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className='flex gap-9'>
              <FormField
                control={form.control}
                name='EmployeeID'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee ID</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        {...field}
                        className={
                          errors.EmployeeID ? 'border-red-700 mt-2' : 'mt-2'
                        }
                      />
                    </FormControl>
                    {errors.EmployeeID && (
                      <FormDescription className='text-red-700 text-sm mt-1'>
                        {errors.EmployeeID.message}
                      </FormDescription>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='EmployeeName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        {...field}
                        className={
                          errors.EmployeeName ? 'border-red-700 mt-2' : 'mt-2'
                        }
                      />
                    </FormControl>
                    {errors.EmployeeName && (
                      <FormDescription className='text-red-700 text-sm mt-1'>
                        {errors.EmployeeName.message}
                      </FormDescription>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='JoinDate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Join Date</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        className={
                          errors.JoinDate
                            ? 'border-red-700 mt-2 w-[300px]'
                            : 'mt-2 w-[180px]'
                        }
                        {...field}
                      />
                    </FormControl>
                    {errors.JoinDate && (
                      <FormDescription className='text-red-700 text-sm mt-1'>
                        {errors.JoinDate.message}
                      </FormDescription>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='OrgGroupName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Group Name</FormLabel>
                  <FormControl>
                    <select
                      className='w-[300px] border border-black block'
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
              name='JobTitleName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title Name</FormLabel>
                  <FormControl>
                    <Input
                      className={
                        errors.JobTitleName
                          ? 'border-red-700 mt-2 w-[300px]'
                          : 'mt-2 w-[300px]'
                      }
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='JobLevelCode'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Level Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Isi Organization Group Name'
                      className={
                        errors.JobLevelCode
                          ? 'border-red-700 mt-2 w-[300px]'
                          : 'mt-2 w-[300px]'
                      }
                      {...field}
                    />
                  </FormControl>
                  {errors.JobLevelCode && (
                    <FormDescription className='text-red-700 text-sm mt-1'>
                      {errors.JobLevelCode.message}
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='Category'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input
                      className={
                        errors.Category
                          ? 'border-red-700 mt-2 w-[300px]'
                          : 'mt-2 w-[300px]'
                      }
                      {...field}
                    />
                  </FormControl>
                  {errors.Category && (
                    <FormDescription className='text-red-700 text-sm mt-1'>
                      {errors.Category.message}
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='Status'
              render={({ field }) => (
                <FormItem className='space-y-3'>
                  <FormLabel>Employee Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className='flex flex-col space-y-1'
                    >
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='Permanent' />
                        </FormControl>
                        <FormLabel className='font-normal'>Permanent</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='Contract' />
                        </FormControl>
                        <FormLabel className='font-normal'>Contract</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type='submit'
              className='mt-4'
              disabled={!isFormDirty(dirtyFields)}
            >
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Modal>
  );
};

export default MPPModal;
