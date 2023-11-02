/* eslint-disable max-len */

'use client';

import React, { FC } from 'react';
import Link from 'next/link';
import {
  HomeIcon,
  ChevronLeft,
  TablePropertiesIcon,
  UserCogIcon,
} from 'lucide-react';
import { useSession } from 'next-auth/react';

interface SidebarProps {
  expand: boolean;
  handleExpand: () => void;
}

const Sidebar: FC<SidebarProps> = ({ expand, handleExpand }) => {
  const { data: session } = useSession();
  return (
    <div
      className={`fixed top-[89px] ${
        expand ? 'w-[231px] z-9' : 'w-[83px]'
      } h-[80vh] bg-white dark:bg-zinc-950 rounded-tr-[20px] shadow-md drop-shadow-xl rounded-br-[20px] pt-[20px] px-[5px] flex flex-col gap-[10px] border-[1px] dark:border-gray-800 transition-all duration-100`}
    >
      <div
        className='py-1 px-6 flex justify-center items-center w-full h-[52px] rounded-2xl cursor-pointer hover:border-[1px] hover:border-[#195FAA] group transition'
        onClick={handleExpand}
        id='toggle-sidebar'
      >
        {expand ? (
          <div className='flex items-center gap-2'>
            <span className='text-[20px] font-normal leading-7 group-hover:text-[#195FAA]'>
              Tutup
            </span>
            <div className='rotate-180 group-hover:text-[#195FAA] group-hover:fill-[#195FAA]'>
              <ChevronLeft className='dark:text-white' />
            </div>
          </div>
        ) : (
          <div className='group-hover:text-[#195FAA] group-hover:fill-[#195FAA]'>
            <ChevronLeft className='dark:text-white' size={30} />
          </div>
        )}
      </div>
      <div className='p-[10px]'>
        <div className='block h-0 w-full border border-spacing-[2px] border-[#000000]/20' />
      </div>
      <Link href='/'>
        <div className='py-1 px-6 flex justify-start items-center w-full h-[52px] rounded-2xl cursor-pointer hover:border-[1px] hover:border-[#195FAA] group transition'>
          {expand ? (
            <div className='flex items-center gap-2 transition'>
              <div className=' group-hover:text-[#195FAA] text-black'>
                <HomeIcon className='dark:text-white' />
              </div>
              <span className='text-[20px] font-semibold leading-7 tracking-tighter group-hover:text-[#195FAA]'>
                Home
              </span>
            </div>
          ) : (
            <div className=' group-hover:text-[#195FAA] text-black'>
              <HomeIcon className='dark:text-white' />
            </div>
          )}
        </div>
      </Link>
      <Link href='/manage-mpp'>
        <div className='py-1 px-6 flex justify-start items-center w-full h-[52px] rounded-2xl cursor-pointer hover:border-[1px] hover:border-[#195FAA] group transition'>
          {expand ? (
            <div className='flex items-center gap-2 transition'>
              <div className=' group-hover:text-[#195FAA] text-black'>
                <TablePropertiesIcon className='dark:text-white' />
              </div>
              <span className='text-[20px] font-semibold leading-7 tracking-tighter group-hover:text-[#195FAA]'>
                Manage MPP
              </span>
            </div>
          ) : (
            <div className=' group-hover:text-[#195FAA] text-black'>
              <TablePropertiesIcon className='dark:text-white' />
            </div>
          )}
        </div>
      </Link>
      {session?.user?.role === 'ADMIN' || session?.user?.role === 'SUPER' ? (
        <Link href='/manage-users'>
          <div className='py-1 px-6 flex justify-start items-center w-full h-[52px] rounded-2xl cursor-pointer hover:border-[1px] hover:border-[#195FAA] group transition'>
            {expand ? (
              <div className='flex items-center gap-2 transition'>
                <div className=' group-hover:text-[#195FAA] text-black'>
                  <UserCogIcon className='dark:text-white' />
                </div>
                <span className='text-[20px] font-semibold leading-7 tracking-tighter group-hover:text-[#195FAA]'>
                  Manage Users
                </span>
              </div>
            ) : (
              <div className=' group-hover:text-[#195FAA] text-black'>
                <UserCogIcon className='dark:text-white' />
              </div>
            )}
          </div>
        </Link>
      ) : null}
    </div>
  );
};
export default Sidebar;
