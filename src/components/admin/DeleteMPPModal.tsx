'use client';

import React, { FC } from 'react';
import { Modal } from '@/components';
import { AlertTriangle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';
import { CardContent } from '../ui/card';
import { Button } from '../ui/button';
import MutationsHandler from '../adminTable/Handler/mutations';

const DeleteMPPModal: FC = () => {
  const { deleteMPPRow } = MutationsHandler();
  const searhParams = useSearchParams();
  const router = useRouter();

  const MPPId = searhParams.get('id');

  const MPPRowDeletion = (id: string | null) => {
    if (id) {
      deleteMPPRow.mutate(
        { id },
        {
          onSuccess: () => {
            router.push('/manage-mpp');
            toast.success('User berhasil dihapus');
          },
          onError: () => {
            router.push('/manage-mpp');
            toast.error('User gagal dihapus');
          },
        },
      );
    }
  };

  return (
    <Modal
      title='Delete MPP Row'
      closeURL='/manage-mpp'
      triggerURL='MPPRowDelete'
    >
      <CardContent>
        <div className='flex gap-2 justify-center'>
          <AlertTriangle size={20} color='red' />
          <p className='font-bold text-red-600'>
            Apakah anda ingin menghapus MPP Row ini?
          </p>
        </div>
        <div className='flex gap-2 justify-center mt-4'>
          <Button variant='destructive' onClick={() => MPPRowDeletion(MPPId)}>
            Ya
          </Button>
          <Button asChild>
            <Link href='/manage-mpp'>Tidak</Link>
          </Button>
        </div>
      </CardContent>
    </Modal>
  );
};

export default DeleteMPPModal;
