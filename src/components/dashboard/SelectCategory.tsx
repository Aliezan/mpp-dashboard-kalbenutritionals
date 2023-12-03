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
import { Button } from '../ui/button';
import SelectCategoryViewModel from './viewModel/SelectCategory.viewModel';

const SelectCategory: FC = () => {
  const { form, Categories, onSubmit } = SelectCategoryViewModel();

  return (
    <Form {...form}>
      <form className='flex gap-3' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='category'
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Select Category' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select by Category</SelectLabel>
                    {Categories?.filter((item) => item.Category !== '').map(
                      (item) => (
                        <SelectItem value={item.Category ?? ''} key={item.id}>
                          {item.Category}
                        </SelectItem>
                      ),
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button type='submit'>Select</Button>
      </form>
    </Form>
  );
};

export default SelectCategory;
