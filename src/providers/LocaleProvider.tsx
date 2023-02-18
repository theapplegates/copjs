import { useTranslation } from 'next-i18next';
import React, { createContext, useContext, useEffect } from 'react';

// The props for the context
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

// The provider
const LocaleProvider = ({ children }: Props) => {
  const { i18n } = useTranslation();

  const { t: translate } = useTranslation(); // Get the i18n instance

  const t = (text: string, replacements?: any) => {
    return translate(text, replacements) || '';
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');

    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage as any);
    }
  }, []);

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

// Get the context
const useLocale = (): LocaleContextProps => useContext(LocaleContext);

// Export the provider and the context
export { LocaleProvider, useLocale };
