import React, { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ProfileAvatar: FC = () => (
  <Avatar className='w-[25px] h-[25px]'>
    <AvatarImage src='/blank-pp.svg' alt='Profile Avatar' />
    <AvatarFallback>US</AvatarFallback>
  </Avatar>
);

export default ProfileAvatar;
