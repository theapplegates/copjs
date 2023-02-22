import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';

import Loader from '@/components/loading/Loader';

interface LoadingContextProps {
  isLoading: boolean;
  setLoading: (value: boolean) => any;
}

// Create a context for the default value
const LoadingContext = createContext<LoadingContextProps>({
  isLoading: false,
  setLoading: () => {}
});

type Props = {
  children: React.ReactNode;
};

const LoadingProvider = ({ children }: Props) => {
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', () => setLoading(true));
    router.events.on('routeChangeComplete', () => setLoading(false));
    router.events.on('routeChangeError', () => setLoading(false));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setLoading
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

const useLoading = (): LoadingContextProps => useContext(LoadingContext);

export { LoadingProvider, useLoading };
