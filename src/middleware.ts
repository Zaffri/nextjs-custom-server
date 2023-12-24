import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Test } from './lib/singleton-test';
 
export async function middleware(request: NextRequest) {
  console.log('Request middleware');
  const requestHeaders = new Headers(request.headers)

  if (!requestHeaders.get('x-correlation-id')) {
    requestHeaders.set('x-correlation-id', '0000-1111-2222-3333')
  }

  // Blows up here, singleton not available here - module caching issue similar to custom server setup?
  Test.log();
 
  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  })
  // console.log("Response", response.status);

  return response;
}