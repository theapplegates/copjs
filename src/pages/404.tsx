import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Button from '@/components/atoms/buttons/Button';
import AppLayout from '@/components/layouts/AppLayout';
import Seo from '@/components/layouts/Seo';

// The 404 page
export default function Error404() {
  const router = useRouter(); // Get the router

  const { t } = useTranslation(); // Get the translation function

  return (
    <>
      <Seo title={t('Page not found') || undefined} />
      <AppLayout>
        <div>{t('Page not found')}</div>
        <div>
          <Button
            color={'primary'}
            className={'my-2'}
            clickHandler={() => {
              router.push('/');
            }}
          >
            {t('Back to homepage')}
          </Button>
        </div>
      </AppLayout>
    </>
  );
}

// Get the translations
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common']))
  }
});
