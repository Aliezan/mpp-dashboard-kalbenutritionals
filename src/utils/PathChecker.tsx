'use client';

import React, { FC } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar, Sidebar } from '@/components';
import SidebarViewModel from '@/components/dashboard/viewModel/Sidebar.viewModel';
import ContentWrapper from './ContentWrapper';

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
          <nav>
            <Navbar />
          </nav>
          <Sidebar expand={isExpand} handleExpand={setIsExpand} />
          <ContentWrapper>{children}</ContentWrapper>
        </>
      ) : (
        children
      )}
    </>
  );
};

export default PathChecker;
