/* eslint-disable max-len */

'use client';

import React, { FC } from 'react';
import Link from 'next/link';
import { HomeIcon, ChevronLeft, TablePropertiesIcon } from 'lucide-react';

interface SidebarProps {
  expand: boolean;
  handleExpand: () => void;
}

const Sidebar: FC<SidebarProps> = ({ expand, handleExpand }) => (
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
    {/* <Link href='/thread/manage' id='sidebar-thread'>
      <div className='py-1 px-6 flex justify-start items-center w-full h-[52px] rounded-2xl cursor-pointer hover:border-[1px] hover:border-[#195FAA] group transition'>
        {expand ? (
          <div className='flex items-center gap-2 transition'>
            <div className=' group-hover:text-[#195FAA] text-black'>
              <svg
                width='25'
                height='25'
                viewBox='0 0 28 30'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect
                  x='2'
                  y='1.66667'
                  width='24'
                  height='26.6667'
                  rx='8.47917'
                  stroke='currentColor'
                  strokeWidth='2.15833'
                />
                <line
                  x1='18.2538'
                  y1='21.4125'
                  x2='8.41217'
                  y2='21.4125'
                  stroke='currentColor'
                  strokeWidth='2.15833'
                  strokeLinecap='round'
                />
                <line
                  x1='18.2538'
                  y1='16.0791'
                  x2='8.41217'
                  y2='16.0791'
                  stroke='currentColor'
                  strokeWidth='2.15833'
                  strokeLinecap='round'
                />
                <line
                  x1='12.9208'
                  y1='10.7458'
                  x2='8.4125'
                  y2='10.7458'
                  stroke='currentColor'
                  strokeWidth='2.15833'
                  strokeLinecap='round'
                />
              </svg>
            </div>
            <span className='text-[20px] font-semibold leading-7 tracking-tighter group-hover:text-[#195FAA]'>
              Manage Thread
            </span>
          </div>
        ) : (
          <div className=' group-hover:text-[#195FAA] text-black'>
            <svg
              width='25'
              height='25'
              viewBox='0 0 28 30'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect
                x='2'
                y='1.66667'
                width='24'
                height='26.6667'
                rx='8.47917'
                stroke='currentColor'
                strokeWidth='2.15833'
              />
              <line
                x1='18.2538'
                y1='21.4125'
                x2='8.41217'
                y2='21.4125'
                stroke='currentColor'
                strokeWidth='2.15833'
                strokeLinecap='round'
              />
              <line
                x1='18.2538'
                y1='16.0791'
                x2='8.41217'
                y2='16.0791'
                stroke='currentColor'
                strokeWidth='2.15833'
                strokeLinecap='round'
              />
              <line
                x1='12.9208'
                y1='10.7458'
                x2='8.4125'
                y2='10.7458'
                stroke='currentColor'
                strokeWidth='2.15833'
                strokeLinecap='round'
              />
            </svg>
          </div>
        )}
      </div>
    </Link>
    <Link href='/thread/report' id='sidebar-report'>
      <div className='py-1 px-6 flex justify-start items-center w-full h-[52px] rounded-2xl cursor-pointer hover:border-[1px] hover:border-[#195FAA] group transition'>
        {expand ? (
          <div className='flex items-center gap-2 transition'>
            <div className=' group-hover:text-[#195FAA] text-black'>
              <svg
                width='25'
                height='25'
                viewBox='0 0 28 28'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <circle
                  cx='14'
                  cy='14'
                  r='11.25'
                  stroke='currentColor'
                  strokeWidth='2.16'
                />
                <path
                  d='M14.7879 9.1625C14.7879 9.59742 14.4353 9.95 14.0004 9.95C13.5654 9.95 13.2129 9.59742 13.2129 9.1625C13.2129 8.72758 13.5654 8.375 14.0004 8.375C14.4353 8.375 14.7879 8.72758 14.7879 9.1625Z'
                  fill='#222628'
                />
                <path
                  d='M14 12.875V19.625'
                  stroke='currentColor'
                  strokeWidth='2.16'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <span className='text-[20px] font-semibold leading-7 tracking-tighter group-hover:text-[#195FAA]'>
              Thread Report
            </span>
          </div>
        ) : (
          <div className=' group-hover:text-[#195FAA] text-black'>
            <svg
              width='25'
              height='25'
              viewBox='0 0 28 28'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle
                cx='14'
                cy='14'
                r='11.25'
                stroke='currentColor'
                strokeWidth='2.16'
              />
              <path
                d='M14.7879 9.1625C14.7879 9.59742 14.4353 9.95 14.0004 9.95C13.5654 9.95 13.2129 9.59742 13.2129 9.1625C13.2129 8.72758 13.5654 8.375 14.0004 8.375C14.4353 8.375 14.7879 8.72758 14.7879 9.1625Z'
                fill='#222628'
              />
              <path
                d='M14 12.875V19.625'
                stroke='currentColor'
                strokeWidth='2.16'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        )}
      </div>
    </Link> */}
  </div>
);
export default Sidebar;
