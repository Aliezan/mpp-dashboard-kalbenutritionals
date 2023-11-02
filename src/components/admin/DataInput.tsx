'use client';

import React, { FC } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileSpreadsheet } from 'lucide-react';
import DataInputViewModel from './viewModel/DataInput.viewModel';
import { Button } from '../ui/button';

const DataInput: FC = () => {
  const { register, handleSubmit, onSubmit } = DataInputViewModel();
  return (
    <Card className='w-[600px]'>
      <CardHeader>
        <CardTitle>Input Data MPP</CardTitle>
        <CardDescription>
          Input data MPP dengan format .csv setiap tanggal 20
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex items-center justify-center'>
          <FileSpreadsheet size={50} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor='MPPFile'>Input file berformat .csv</Label>
          <Input
            {...register('file')}
            type='file'
            name='file'
            id='MPPfile'
            accept='.csv'
          />
          <div className='flex items-center justify-center'>
            <Button type='submit' className='mt-4'>
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DataInput;
