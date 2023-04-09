'use client';

import Head from 'next/head';
import { useParams } from 'next/navigation';

import Button from '@/components/atoms/buttons/Button';
import H1 from '@/components/atoms/typography/headings/H1';
import BaseLayout from '@/components/layouts/BaseLayout';
import { getDictionariesClient } from '@/i18n';
import { getTranslator } from '@/utils/localization';

export default function Page() {
  const params = useParams();

  const t = getTranslator(getDictionariesClient(params?.lang));

  return (
    <>
      <Head>
        <title>{t('page_not_found')}</title>
      </Head>

      <BaseLayout>
        <div className="flex h-full w-full items-center justify-center">
          <div>
            <H1 className="mb-3">{t('page_not_found')}</H1>
            <div>
              <Button
                color={'primary'}
                className={'my-2 w-full justify-center'}
                size="small"
                clickHandler={() => {
                  window.location.href = '/';
                }}
              >
                {t('back_to_homepage')}
              </Button>
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
}
