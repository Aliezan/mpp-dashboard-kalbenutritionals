import React, { FC } from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import SessionProvider from '@/utils/SessionProvider';
import { Toaster } from 'sonner';
import ThemeProvider from '@/utils/ThemeProvider';
import PathChecker from '@/utils/PathChecker';
import Providers from '@/utils/Providers';
import { authOptions } from '@/server/auth';

interface RootLayoutProps {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MPP Dashboard',
  description: 'Manpower Dashboard',
};

const RootLayout: FC<RootLayoutProps> = async ({ children }) => {
  const session = await getServerSession(authOptions);

  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <SessionProvider session={session}>
            <Toaster richColors position='top-right' />
            <Providers>
              <PathChecker>{children}</PathChecker>
            </Providers>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
