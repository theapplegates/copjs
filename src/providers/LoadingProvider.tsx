import React, { createContext, useContext, useState } from 'react';

import Loader from '@/components/loading/Loader';

// The props for the context
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

// The provider
const LoadingProvider = ({ children }: Props) => {
  const [isLoading, setLoading] = useState(false);

  if (isLoading) {
    return <Loader />;
  }

  // Return the provider
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

// Get the context
const useLoading = (): LoadingContextProps => useContext(LoadingContext);

// Export the provider and the context
export { LoadingProvider, useLoading };
