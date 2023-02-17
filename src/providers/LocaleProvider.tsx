import { useTranslation } from 'next-i18next';
import React, { createContext, useContext } from 'react';

// The props for the locale context
interface LocaleContextProps {
  t: (text: string, replacements?: any) => any;
}

// Create a context for the default value
const LocaleContext = createContext<LocaleContextProps>({
  t: (text: string) => text as any
});

type Props = {
  children: React.ReactNode;
};

// The locale provider
const LocaleProvider = ({ children }: Props) => {
  const { t: translate } = useTranslation(); // Get the i18n instance

  const t = (text: string, replacements?: any) => {
    return translate(text, replacements) || '';
  };

  // Return the provider
  return (
    <LocaleContext.Provider
      value={{
        t
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
};

// Get the locale context
const useLocale = (): LocaleContextProps => useContext(LocaleContext);

// Export the locale provider and the locale context
export { LocaleProvider, useLocale };
