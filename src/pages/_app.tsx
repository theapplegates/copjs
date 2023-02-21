import 'windi.css';
import '@/styles/globals.css';

import i18n from 'i18next';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import translationDE from '@/assets/locales/de.json';
import translationEN from '@/assets/locales/en.json';
import Loader from '@/components/loading/Loader';
import { LoadingProvider } from '@/providers/LoadingProvider';
import { LocaleProvider } from '@/providers/LocaleProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { trpc } from '@/utils/trpc';

// Define an array of supported languages
const supportedLanguages = ['en', 'de'];

// Determine the user's preferred language based on the browser's language settings
const browserLanguage =
  typeof window !== 'undefined' ? navigator.language.split('-')[0] || '' : '';

// Check if the user's preferred language is supported, otherwise fallback to default language
const language = supportedLanguages.includes(browserLanguage)
  ? browserLanguage
  : 'en';

// i18n configuration
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEN },
    de: { translation: translationDE }
  },
  lng: language,
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false
  }
});

// The app
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

  // Return the app
  return (
    <SessionProvider session={session}>
      <I18nextProvider i18n={i18n}>
        <LocaleProvider>
          <ThemeProvider>
            <LoadingProvider>
              <Component {...pageProps} />
            </LoadingProvider>
          </ThemeProvider>
        </LocaleProvider>
      </I18nextProvider>
    </SessionProvider>
  );
};

// Export the app
export default trpc.withTRPC(App);
