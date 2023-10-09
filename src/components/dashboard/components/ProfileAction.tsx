'use client';

import React, { FC } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import ProfileAvatar from './ProfileAvatar';

const ProfileAction: FC = () => {
  const { data: session } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className='flex gap-5'>
          <ProfileAvatar />
          <h1>{session?.user?.name}</h1>
          <ChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => signOut()}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileAction;
