import { getEnv } from '@nextnexus/env';
import { middlewareHandler } from '@nextnexus/sso-client';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  return middlewareHandler(`${getEnv().NextNexus.AppURL.portal}/api/callback`)(
    request
  );
}

export const config = {
  // This matches everything except for static files
  matcher: ['/((?!_next/static|static|favicon.ico).*)'],
};
