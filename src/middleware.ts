import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  (request: NextRequestWithAuth) => {
    if (
      request.nextUrl.pathname.startsWith('/admin') &&
      request.nextauth.token?.role !== 'ADMIN'
    ) {
      const redirectUrl = new URL('/', request.url);
      return NextResponse.redirect(redirectUrl.toString());
    }
    return NextResponse.next();
  },

  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = { matcher: ['/', '/manage-mpp'] };
