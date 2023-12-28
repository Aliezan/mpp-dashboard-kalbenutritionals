'use client';

import React, { FC } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import ProfileAction from './ProfileAction';

const Navbar: FC = () => {
  const { setTheme } = useTheme();

  return (
    <div className='bg-white dark:bg-zinc-950 border-b-[0.5px] border-gray-500 fixed top-0 w-full z-10'>
      <div className='flex justify-between gap-[300px] h-[70px] px-[70px]'>
        <div className='pt-[23px]'>
          <h1 className='font-bold'>MPP Dashboard</h1>
        </div>
        <div className='flex gap-[50px]'>
          <ProfileAction />
          <div className='mt-[14px]'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost'>
                  <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                  <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
