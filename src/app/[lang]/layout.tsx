/* eslint-disable import/order */
import 'windi.css';
import '@/styles/globals.css';

import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import type { ValidLocale } from '@/i18n';
import {
  defaultLocale,
  getDictionaries,
  getLocalePartsFrom,
  locales
} from '@/i18n';
import { TrpcProvider } from '@/providers/TrpcProvider';
import { getTranslator } from '@/utils/localization';

import LayoutClient from './layout.client';

export async function generateStaticParams() {
  return locales.map((locale: string) => getLocalePartsFrom({ locale }));
}

export const generateMetadata = async ({
  params
}: {
  params: { lang: ValidLocale };
}): Promise<Metadata> => {
  const dictionaries = await getDictionaries(params?.lang);

  const t = getTranslator(dictionaries);

  return {
    title: {
      default: t('metadata.title.default'),
      template: t('metadata.title.template')
    },
    description: t('metadata.description'),
    applicationName: t('metadata.applicationName'),
    icons: {
      icon: '/favicon.ico'
    },
    robots: {
      index: true,
      follow: true
    }
  };
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: ValidLocale };
}) {
  const dictionaries = await getDictionaries(params?.lang, true);

  if (!dictionaries) {
    redirect(`/${defaultLocale}`);
  }

  return (
    <html lang={`${params?.lang}`}>
      <head />
      <body className="h-full w-full">
        <TrpcProvider>
          <LayoutClient>{children}</LayoutClient>
        </TrpcProvider>
      </body>
    </html>
  );
}
