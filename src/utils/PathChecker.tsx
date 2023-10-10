'use client';

import React, { FC } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar, Sidebar } from '@/components';
import SidebarViewModel from '@/components/dashboard/viewModel/Sidebar.viewModel';

interface PathCheckerProps {
  children: React.ReactNode;
}

const PathChecker: FC<PathCheckerProps> = ({ children }) => {
  const excludedPath = ['/login'];
  const isExcluded = excludedPath.includes(usePathname());

  const { isExpand, setIsExpand } = SidebarViewModel();

  return (
    <>
      {!isExcluded ? (
        <>
          <Navbar />
          <Sidebar expand={isExpand} handleExpand={setIsExpand} />
          {children}
        </>
      ) : (
        children
      )}
    </>
  );
};

export default PathChecker;
