/* eslint-disable import/order */
import 'windi.css';
import '@/styles/globals.css';

import { redirect } from 'next/navigation';

import type { ValidLocale } from '@/i18n';
import { defaultLocale, getDictionaries } from '@/i18n';

export default async function Page({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: ValidLocale };
}) {
  const dictionaries = await getDictionaries(params?.lang, true);

  if (!dictionaries) {
    redirect(`/${defaultLocale}/auth/signup`);
  }

  return <>{children}</>;
}
