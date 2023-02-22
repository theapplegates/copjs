import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { setCookie } from 'nookies';
import { useCallback } from 'react';

export default function LocaleSelector() {
  const router = useRouter();

  const { t } = useTranslation();

  const changeLocale = useCallback(
    (locale: string) => {
      setCookie(null, 'NEXT_LOCALE', locale);

      router.push(router.asPath, undefined, { locale });
    },
    [router.replace, router.reload]
  );

  return (
    <>
      <div
        onClick={() => {
          changeLocale('de');
        }}
        className="cursor-pointer uppercase"
      >
        {t('DE')}
      </div>
      <div
        onClick={() => {
          changeLocale('en');
        }}
        className="cursor-pointer uppercase"
      >
        {t('EN')}
      </div>
    </>
  );
}
