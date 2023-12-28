'use client';

import React, { FC } from 'react';
import { Modal } from '@/components';
import { AlertTriangle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';
import { CardContent } from '../ui/card';
import { Button } from '../ui/button';
import MutationsHandler from '../userList/Handler/mutations';

const DeleteUserModal: FC = () => {
  const { deleteUser } = MutationsHandler();
  const searhParams = useSearchParams();
  const router = useRouter();

  const userEmail = searhParams.get('email');

  const userDeletion = (email: string | null) => {
    if (email) {
      deleteUser.mutate(
        { email },
        {
          onSuccess: () => {
            router.push('/manage-users');
            toast.success('User berhasil dihapus');
          },
          onError: () => {
            router.push('/manage-users');
            toast.error('User gagal dihapus');
          },
        },
      );
    }
  };

  return (
    <Modal
      title='Delete User'
      closeURL='/manage-users'
      triggerURL='deleteConfirmation'
    >
      <CardContent>
        <div className='flex gap-2 justify-center'>
          <AlertTriangle size={20} color='red' />
          <p className='font-bold text-red-600'>
            Apakah anda ingin menghapus user ini?
          </p>
        </div>
        <div className='flex gap-2 justify-center mt-4'>
          <Button variant='destructive' onClick={() => userDeletion(userEmail)}>
            Ya
          </Button>
          <Button asChild>
            <Link href='/manage-users'>Tidak</Link>
          </Button>
        </div>
      </CardContent>
    </Modal>
  );
};

export default DeleteUserModal;
