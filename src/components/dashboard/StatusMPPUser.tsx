'use client';

import React, { FC } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { trpc } from '@/app/_trpc/client';
import { Skeleton } from '../ui/skeleton';

const StatusMPP: FC = () => {
  const { data: userOrg, isLoading: isLoadingUserOrg } =
    trpc.userRouter.getCurrentUserOrg.useQuery();

  return (
    <Card className='w-[600px]'>
      <CardHeader>
        <div className='flex justify-between'>
          <div className='space-y-2'>
            <CardTitle>Status Pengajuan MPP</CardTitle>
            <CardDescription>Ringkasan Total Employee</CardDescription>
          </div>
          {isLoadingUserOrg ? (
            <Skeleton className='w-[100px] h-[52px] rounded-lg' />
          ) : (
            <Badge>{userOrg?.Org_Group_Name}</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className='flex gap-10'>
          <div className='space-y-2'>
            <Badge variant='secondary'>Pending</Badge>
            <p className='px-2.5' />
          </div>
          <div className='space-y-2'>
            <Badge variant='destructive'>Ditolak</Badge>
            <p className='px-2.5' />
          </div>
          <div className='space-y-2'>
            <Badge>Approved</Badge>
            <p className='px-2.5' />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusMPP;
