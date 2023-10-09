import { DefaultSession } from 'next-auth';

export enum Role {
  user = 'USER',
  admin = 'ADMIN',
  super = 'SUPER',
}

declare module 'next-auth' {
  interface User {
    role?: Role;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}
