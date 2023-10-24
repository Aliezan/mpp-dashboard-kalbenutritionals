'use client';

import React, { FC } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import SelectMonthViewModel from './viewModel/SelectMonth.viewModel';
import { Button } from '../ui/button';

const SelectMonth: FC = () => {
  const { form, onSubmit } = SelectMonthViewModel();

  return (
    <Form {...form}>
      <form className='flex gap-3' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='month'
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Month' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select by Month</SelectLabel>
                    <SelectItem value='Jan'>January</SelectItem>
                    <SelectItem value='Feb'>February</SelectItem>
                    <SelectItem value='Mar'>March</SelectItem>
                    <SelectItem value='Apr'>April</SelectItem>
                    <SelectItem value='May'>May</SelectItem>
                    <SelectItem value='Jun'>June</SelectItem>
                    <SelectItem value='Jul'>July</SelectItem>
                    <SelectItem value='Aug'>August</SelectItem>
                    <SelectItem value='Sep'>September</SelectItem>
                    <SelectItem value='Oct'>October</SelectItem>
                    <SelectItem value='Nov'>November</SelectItem>
                    <SelectItem value='Dec'>December</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button type='submit'>Select Month</Button>
      </form>
    </Form>
  );
};

export default SelectMonth;
