'use client';

import React, { FC } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/components';

interface PathCheckerProps {
  children: React.ReactNode;
}

const PathChecker: FC<PathCheckerProps> = ({ children }) => {
  const excludedPath = ['/login'];
  const isExcluded = excludedPath.includes(usePathname());

  return (
    <>
      {!isExcluded ? (
        <>
          <Navbar />
          {children}
        </>
      ) : (
        children
      )}
    </>
  );
};

export default PathChecker;
