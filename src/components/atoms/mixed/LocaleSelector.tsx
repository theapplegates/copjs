import { useParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { getDictionariesClient } from '@/i18n';
import { getTranslator } from '@/utils/localization';

export default function LocaleSelector() {
  const router = useRouter();
  const params = useParams();

  const t = getTranslator(getDictionariesClient(params?.lang));

  const changeLocale = useCallback((locale: string) => {
    router.push(`/${locale}`);
  }, []);

  return (
    <>
      <div
        onClick={() => {
          changeLocale('de-DE');
        }}
        className="cursor-pointer uppercase"
      >
        {t('language.de-DE')}
      </div>
      <div
        onClick={() => {
          changeLocale('en-US');
        }}
        className="cursor-pointer uppercase"
      >
        {t('language.en-US')}
      </div>
    </>
  );
}
