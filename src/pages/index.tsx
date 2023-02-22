import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';

import AppLayout from '@/components/layouts/AppLayout';
import Seo from '@/components/layouts/Seo';
import Loader from '@/components/loading/Loader';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'zod']))
    }
  };
};

export default function Index() {
  const router = useRouter();

  const { t } = useTranslation();

  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/housekeeping');
    }
  }, [status]);

  if (status === 'loading' || status === 'authenticated') {
    return <Loader />;
  }

  return (
    <>
      <Seo title={'App'} />
      <AppLayout>
        <div className="mb-2">{t('Not signed in.')}</div>
      </AppLayout>
    </>
  );
}
