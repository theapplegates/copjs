import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Button from '@/components/atoms/buttons/Button';
import H1 from '@/components/atoms/typography/headings/H1';
import BaseLayout from '@/components/layouts/BaseLayout';
import Seo from '@/components/layouts/Seo';

export async function getStaticProps({ locale }: any) {
  return {
    props: { ...(await serverSideTranslations(locale, ['common'])) }
  };
}

export default function Error404() {
  const router = useRouter();

  const { t } = useTranslation();

  return (
    <>
      <Seo title={t('Internal Error') as string} />

      <BaseLayout>
        <div className="flex h-full w-full items-center justify-center">
          <div>
            <H1 className="mb-3">{t('Internal Error')}</H1>
            <div>
              <Button
                color={'primary'}
                className={'my-2 w-full justify-center'}
                size="small"
                clickHandler={() => {
                  router.push('/');
                }}
              >
                {t('Back to homepage')}
              </Button>
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
}
