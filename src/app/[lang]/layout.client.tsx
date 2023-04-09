'use client';

import { SessionProvider } from 'next-auth/react';

import { ThemeProvider } from '@/providers/ThemeProvider';

export default function LayoutClient({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SessionProvider refetchOnWindowFocus={false}>
        <ThemeProvider>{children}</ThemeProvider>
      </SessionProvider>
    </>
  );
}
