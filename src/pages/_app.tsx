import 'windi.css';
import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import Loader from '@/components/loading/Loader';
import { LoadingProvider } from '@/providers/LoadingProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { trpc } from '@/utils/trpc';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const [initialRenderComplete, setInitialRenderComplete] =
    useState<boolean>(false);

  // Wait for the initial render to complete
  useEffect(() => {
    setInitialRenderComplete(true); // Set the initial render to complete
  }, []);

  // If the initial render is not complete, return an empty fragment
  if (!initialRenderComplete)
    return (
      <>
        <Loader />
      </>
    );

  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <LoadingProvider>
          <Component {...pageProps} />
        </LoadingProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(appWithTranslation(App));
