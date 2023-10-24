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
  const { adminRouter } = trpc;
  const { data: StatusMPPData } = adminRouter.MPPStatus.useQuery();

  return (
    <Card className='w-[600px]'>
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
            <p className='px-2.5'>
              {(StatusMPPData?.pendingCount as { isApproved: number })
                ?.isApproved ?? 0}
            </p>
          </div>
          <div className='space-y-2'>
            <Badge variant='destructive'>Ditolak</Badge>
            <p className='px-2.5'>
              {(StatusMPPData?.rejectedCount as { isApproved: number })
                ?.isApproved ?? 0}
            </p>
          </div>
          <div className='space-y-2'>
            <Badge>Berhasil</Badge>
            <p className='px-2.5'>
              {(StatusMPPData?.approvedCount as { isApproved: number })
                ?.isApproved ?? 0}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusMPP;
