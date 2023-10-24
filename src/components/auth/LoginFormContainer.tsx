import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React, { FC } from 'react';

interface LoginFormContainerProps {
  children: React.ReactNode;
}

const LoginFormContainer: FC<LoginFormContainerProps> = ({ children }) => (
  <Card className='w-[500px]'>
    <CardHeader>
      <CardTitle>Login</CardTitle>
      <CardDescription>
        Silahkan login untuk masuk kedalam aplikasi
      </CardDescription>
      <CardContent>{children}</CardContent>
    </CardHeader>
  </Card>
);

export default LoginFormContainer;
