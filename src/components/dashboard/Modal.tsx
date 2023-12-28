'use client';

import React, { FC, useRef, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { X } from 'lucide-react';
import { Button } from '../ui/button';

interface ModalProps {
  title: string;
  closeURL: string;
  triggerURL: string;
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ title, closeURL, triggerURL, children }) => {
  const searchParams = useSearchParams();
  const modalRef = useRef<null | HTMLDialogElement>(null);
  const showModal = searchParams.get(triggerURL);
  const router = useRouter();

  useEffect(() => {
    if (showModal === 'y') {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [showModal]);

  const closeModal = () => {
    modalRef.current?.close();
    router.push(closeURL);
  };

  const modal: JSX.Element | null =
    showModal === 'y' ? (
      <dialog
        ref={modalRef}
        className='fixed top-50 left-50 -translate-x-50 -translate-y-50 z-10  rounded-xl backdrop:bg-gray-800/50 w-[800px]'
      >
        <div className='flex justify-between'>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <Button
            type='button'
            variant='ghost'
            onClick={closeModal}
            className='mt-3'
          >
            <X color='red' />
          </Button>
        </div>
        {children}
      </dialog>
    ) : null;

  return modal;
};

export default Modal;
