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

const StatusMPP: FC = () => {
  const { approvalRouter } = trpc;
  const { data: ApprovalData } = approvalRouter.getApprovalStatus.useQuery();
  return (
    <Card className='w-[600px] mt-6'>
      <CardHeader>
        <CardTitle>Status Pengajuan MPP</CardTitle>
        <CardDescription>
          Lihat Status Pengajuan MPP Terhadap User
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex gap-10'>
          <div className='space-y-2'>
            <Badge variant='secondary'>Pending</Badge>
            <p className='px-2.5'>{ApprovalData}</p>
          </div>
          <div className='space-y-2'>
            <Badge variant='destructive'>Ditolak</Badge>
            <p className='px-2.5'>{ApprovalData}</p>
          </div>
          <div className='space-y-2'>
            <Badge>Berhasil</Badge>
            <p className='px-2.5'>{ApprovalData}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusMPP;
