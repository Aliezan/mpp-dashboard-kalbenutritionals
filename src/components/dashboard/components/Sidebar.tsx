'use client';

import React, { FC } from 'react';
import Link from 'next/link';

interface SidebarProps {
  expand: boolean;
  handleExpand: () => void;
}

const Sidebar: FC<SidebarProps> = ({ expand, handleExpand }) => (
  <div
    className={`fixed top-[89px] ${
      expand ? 'w-[231px] z-9' : 'w-[83px]'
    } h-[80vh] bg-white rounded-tr-[20px] shadow-md drop-shadow-xl rounded-br-[20px] pt-[20px] px-[5px] flex flex-col gap-[10px] border-[1px] transition-all duration-100`}
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
            <svg
              width='13'
              height='22'
              viewBox='0 0 13 21'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12.2081 11.7075L2.20806 21.7075C2.11515 21.8004 2.00485 21.8741 1.88345 21.9244C1.76206 21.9747 1.63195 22.0006 1.50056 22.0006C1.36916 22.0006 1.23905 21.9747 1.11766 21.9244C0.996267 21.8741 0.885966 21.8004 0.793056 21.7075C0.700145 21.6146 0.626445 21.5043 0.576162 21.3829C0.52588 21.2615 0.5 21.1314 0.5 21C0.5 20.8686 0.52588 20.7385 0.576162 20.6171C0.626445 20.4957 0.700145 20.3854 0.793056 20.2925L10.0868 11L0.793056 1.70751C0.605415 1.51987 0.5 1.26537 0.5 1.00001C0.5 0.734643 0.605415 0.480147 0.793056 0.292507C0.980696 0.104866 1.23519 -0.000549314 1.50056 -0.000549316C1.76592 -0.000549318 2.02042 0.104866 2.20806 0.292507L12.2081 10.2925C12.301 10.3854 12.3748 10.4957 12.4251 10.6171C12.4754 10.7385 12.5013 10.8686 12.5013 11C12.5013 11.1314 12.4754 11.2615 12.4251 11.3829C12.3748 11.5043 12.301 11.6146 12.2081 11.7075Z'
                fill='currentColor'
              />
            </svg>
          </div>
        </div>
      ) : (
        <div className='group-hover:text-[#195FAA] group-hover:fill-[#195FAA]'>
          <svg
            width='13'
            height='22'
            viewBox='0 0 13 22'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12.2081 11.7075L2.20806 21.7075C2.11515 21.8004 2.00485 21.8741 1.88345 21.9244C1.76206 21.9747 1.63195 22.0006 1.50056 22.0006C1.36916 22.0006 1.23905 21.9747 1.11766 21.9244C0.996267 21.8741 0.885966 21.8004 0.793056 21.7075C0.700145 21.6146 0.626445 21.5043 0.576162 21.3829C0.52588 21.2615 0.5 21.1314 0.5 21C0.5 20.8686 0.52588 20.7385 0.576162 20.6171C0.626445 20.4957 0.700145 20.3854 0.793056 20.2925L10.0868 11L0.793056 1.70751C0.605415 1.51987 0.5 1.26537 0.5 1.00001C0.5 0.734643 0.605415 0.480147 0.793056 0.292507C0.980696 0.104866 1.23519 -0.000549314 1.50056 -0.000549316C1.76592 -0.000549318 2.02042 0.104866 2.20806 0.292507L12.2081 10.2925C12.301 10.3854 12.3748 10.4957 12.4251 10.6171C12.4754 10.7385 12.5013 10.8686 12.5013 11C12.5013 11.1314 12.4754 11.2615 12.4251 11.3829C12.3748 11.5043 12.301 11.6146 12.2081 11.7075Z'
              fill='currentColor'
            />
          </svg>
        </div>
      )}
    </div>
    <div className='p-[10px]'>
      <div className='block h-0 w-full border border-spacing-[2px] border-[#000000]/20' />
    </div>
    <Link href='/' id='sidebar-home'>
      <div className='py-1 px-6 flex justify-start items-center w-full h-[52px] rounded-2xl cursor-pointer hover:border-[1px] hover:border-[#195FAA] group transition'>
        {expand ? (
          <div className='flex items-center gap-2 transition'>
            <div className=' group-hover:text-[#195FAA] text-black'>
              <svg
                width='25'
                height='25'
                viewBox='0 0 29 27'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M2 14.8855C2 12.505 2 11.3148 2.50049 10.282C3.00099 9.24922 3.93518 8.5117 5.80356 7.03666L8.30355 5.06298C11.2773 2.71528 12.7642 1.54143 14.5 1.54143C16.2358 1.54143 17.7227 2.71528 20.6964 5.06298L23.1964 7.03666C25.0648 8.5117 25.999 9.24922 26.4995 10.282C27 11.3148 27 12.505 27 14.8855V19.8289C27 22.6574 27 24.0716 26.1213 24.9503C25.2426 25.8289 23.8284 25.8289 21 25.8289H14.5H8C5.17157 25.8289 3.75736 25.8289 2.87868 24.9503C2 24.0716 2 22.6574 2 19.8289V14.8855Z'
                  stroke='currentColor'
                  strokeWidth='2.1'
                />
                <path
                  d='M18.4475 25.829C18.4475 25.3106 18.3454 24.7973 18.147 24.3184C17.9486 23.8395 17.6579 23.4043 17.2913 23.0377C16.9248 22.6712 16.4896 22.3804 16.0107 22.1821C15.5318 21.9837 15.0185 21.8816 14.5001 21.8816C13.9817 21.8816 13.4684 21.9837 12.9895 22.1821C12.5106 22.3804 12.0754 22.6712 11.7089 23.0377C11.3423 23.4043 11.0516 23.8395 10.8532 24.3184C10.6548 24.7973 10.5527 25.3106 10.5527 25.829L14.5001 25.829H18.4475Z'
                  stroke='currentColor'
                  strokeWidth='2.1'
                />
              </svg>
            </div>
            <span className='text-[20px] font-semibold leading-7 tracking-tighter group-hover:text-[#195FAA]'>
              Home
            </span>
          </div>
        ) : (
          <div className=' group-hover:text-[#195FAA] text-black'>
            <svg
              width='25'
              height='25'
              viewBox='0 0 29 27'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M2 14.8855C2 12.505 2 11.3148 2.50049 10.282C3.00099 9.24922 3.93518 8.5117 5.80356 7.03666L8.30355 5.06298C11.2773 2.71528 12.7642 1.54143 14.5 1.54143C16.2358 1.54143 17.7227 2.71528 20.6964 5.06298L23.1964 7.03666C25.0648 8.5117 25.999 9.24922 26.4995 10.282C27 11.3148 27 12.505 27 14.8855V19.8289C27 22.6574 27 24.0716 26.1213 24.9503C25.2426 25.8289 23.8284 25.8289 21 25.8289H14.5H8C5.17157 25.8289 3.75736 25.8289 2.87868 24.9503C2 24.0716 2 22.6574 2 19.8289V14.8855Z'
                stroke='currentColor'
                strokeWidth='2.1'
              />
              <path
                d='M18.4475 25.829C18.4475 25.3106 18.3454 24.7973 18.147 24.3184C17.9486 23.8395 17.6579 23.4043 17.2913 23.0377C16.9248 22.6712 16.4896 22.3804 16.0107 22.1821C15.5318 21.9837 15.0185 21.8816 14.5001 21.8816C13.9817 21.8816 13.4684 21.9837 12.9895 22.1821C12.5106 22.3804 12.0754 22.6712 11.7089 23.0377C11.3423 23.4043 11.0516 23.8395 10.8532 24.3184C10.6548 24.7973 10.5527 25.3106 10.5527 25.829L14.5001 25.829H18.4475Z'
                stroke='currentColor'
                strokeWidth='2.1'
              />
            </svg>
          </div>
        )}
      </div>
    </Link>
    <Link href='/manage-user/total' id='sidebar-user'>
      <div className='py-1 px-6 flex justify-start items-center w-full h-[52px] rounded-2xl cursor-pointer hover:border-[1px] hover:border-[#195FAA] group transition'>
        {expand ? (
          <div className='flex items-center gap-2 transition'>
            <div className=' group-hover:text-[#195FAA] text-black'>
              <svg
                width='25'
                height='25'
                viewBox='0 0 26 30'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M1.60501 22.9832C1.65999 22.4819 1.68748 22.2312 1.72191 22.0523C2.13975 19.8814 3.89564 18.4199 6.10633 18.403C6.28848 18.4016 6.57289 18.4224 7.14171 18.4642C8.9084 18.5938 10.8985 18.7 12.6781 18.7C14.5356 18.7 16.5953 18.5843 18.386 18.447C18.9346 18.405 19.2088 18.384 19.3872 18.3844C21.4817 18.3901 23.1737 19.6896 23.7195 21.7117C23.766 21.884 23.8104 22.122 23.8992 22.598V22.598C23.9971 23.1229 24.046 23.3853 24.0651 23.5986C24.2859 26.0639 22.4743 28.2447 20.0102 28.4797C19.7971 28.5 19.5302 28.5 18.9962 28.5L12.6781 28.5H6.54983C6.06399 28.5 5.82107 28.5 5.62244 28.4824C3.26495 28.273 1.47255 26.2733 1.52144 23.907C1.52556 23.7077 1.55205 23.4662 1.60501 22.9832V22.9832Z'
                  stroke='currentColor'
                  strokeWidth='2.1'
                />
                <path
                  d='M7 7.5C7 4.18629 9.68629 1.5 13 1.5V1.5C16.3137 1.5 19 4.18629 19 7.5V8.35714C19 11.1975 16.6975 13.5 13.8571 13.5V13.5H12.1429V13.5C9.30254 13.5 7 11.1975 7 8.35714V7.5Z'
                  stroke='currentColor'
                  strokeWidth='2.1'
                />
              </svg>
            </div>
            <span className='text-[20px] font-semibold leading-7 tracking-tighter group-hover:text-[#195FAA]'>
              Manage User
            </span>
          </div>
        ) : (
          <div className=' group-hover:text-[#195FAA] text-black'>
            <svg
              width='25'
              height='25'
              viewBox='0 0 26 30'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M1.60501 22.9832C1.65999 22.4819 1.68748 22.2312 1.72191 22.0523C2.13975 19.8814 3.89564 18.4199 6.10633 18.403C6.28848 18.4016 6.57289 18.4224 7.14171 18.4642C8.9084 18.5938 10.8985 18.7 12.6781 18.7C14.5356 18.7 16.5953 18.5843 18.386 18.447C18.9346 18.405 19.2088 18.384 19.3872 18.3844C21.4817 18.3901 23.1737 19.6896 23.7195 21.7117C23.766 21.884 23.8104 22.122 23.8992 22.598V22.598C23.9971 23.1229 24.046 23.3853 24.0651 23.5986C24.2859 26.0639 22.4743 28.2447 20.0102 28.4797C19.7971 28.5 19.5302 28.5 18.9962 28.5L12.6781 28.5H6.54983C6.06399 28.5 5.82107 28.5 5.62244 28.4824C3.26495 28.273 1.47255 26.2733 1.52144 23.907C1.52556 23.7077 1.55205 23.4662 1.60501 22.9832V22.9832Z'
                stroke='currentColor'
                strokeWidth='2.1'
              />
              <path
                d='M7 7.5C7 4.18629 9.68629 1.5 13 1.5V1.5C16.3137 1.5 19 4.18629 19 7.5V8.35714C19 11.1975 16.6975 13.5 13.8571 13.5V13.5H12.1429V13.5C9.30254 13.5 7 11.1975 7 8.35714V7.5Z'
                stroke='currentColor'
                strokeWidth='2.1'
              />
            </svg>
          </div>
        )}
      </div>
    </Link>
    <Link href='/thread/manage' id='sidebar-thread'>
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
    </Link>
  </div>
);
export default Sidebar;
