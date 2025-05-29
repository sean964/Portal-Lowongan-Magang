import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { SECRET } from '../environment/env';

export async function middleware(request) {
  const token = await getToken({
    req: request,
  });

  const { pathname } = request.nextUrl;
  // redirect user yang sudah login
  if (pathname === '/auth/login' || pathname === '/auth/register') {
    if (token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // handle admin
  if (pathname.startsWith('/admin')) {
    if (!token) {
      const url = new URL('/auth/login', request.url);
      url.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(url);
    }
    if (token?.role !== 'admin') {
      const url = new URL('/', request.url);
      url.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(url);
    }
  }
  if (pathname === '/') {
    if (token?.role === 'admin') {
      return NextResponse.redirect(new URL('/admin', encodeURI(request.url)));
    }
  }

  // handle mahasiswa
  if (pathname.startsWith('/mahasiswa')) {
    if (!token) {
      const url = new URL('/auth/login', request.url);
      url.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(url);
    }
    if (token?.role !== 'mahasiswa') {
      const url = new URL('/', request.url);
      url.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(url);
    }
  }
  if (pathname === '/') {
    if (token?.role === 'mahasiswa') {
      return NextResponse.redirect(
        new URL('/mahasiswa', encodeURI(request.url))
      );
    }
  }

  // handle dosen
  if (pathname.startsWith('/dosen')) {
    if (!token) {
      const url = new URL('/auth/login', request.url);
      url.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(url);
    }
    if (token?.role !== 'dosen') {
      const url = new URL('/', request.url);
      url.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(url);
    }
  }
  if (pathname === '/') {
    if (token?.role === 'dosen') {
      return NextResponse.redirect(new URL('/dosen', encodeURI(request.url)));
    }
  }

  // handle perusahaan
  if (pathname.startsWith('/perusahaan')) {
    if (!token) {
      const url = new URL('/auth/login', request.url);
      url.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(url);
    }
    if (token?.role !== 'perusahaan') {
      const url = new URL('/', request.url);
      url.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(url);
    }
  }
  if (pathname === '/') {
    if (token?.role === 'perusahaan') {
      return NextResponse.redirect(
        new URL('/perusahaan', encodeURI(request.url))
      );
    }
  }

  // handle supervisor
  if (pathname.startsWith('/supervisor')) {
    if (!token) {
      const url = new URL('/auth/login', request.url);
      url.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(url);
    }
    if (token?.role !== 'supervisor') {
      const url = new URL('/', request.url);
      url.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(url);
    }
  }
  if (pathname === '/') {
    if (token?.role === 'supervisor') {
      return NextResponse.redirect(
        new URL('/supervisor', encodeURI(request.url))
      );
    }
  }
}
