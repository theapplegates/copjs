import type { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import AppLayout from '@/components/layouts/AppLayout';
import Seo from '@/components/layouts/Seo';

// The index page
export default function Index() {
  const router = useRouter(); // Get the router

  const { t } = useTranslation(); // Get the translation function

  const { status } = useSession(); // Get the session

  useEffect(() => {
    // If the user is authenticated
    if (status === 'authenticated') {
      router.push('/housekeeping'); // Redirect to the housekeeping page
    }
  }, [status]);

  // If the session is loading or authenticated, return the loading message
  if (status === 'loading' || status === 'authenticated') {
    return <>{t('Loading')}</>;
  }

  // Return the index page
  return (
    <>
      <Seo title={'App'} />
      <AppLayout>
        <div className="mb-2">{t('Not signed in.')}</div>
      </AppLayout>
    </>
  );
}

// Get the translations
export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? 'en', ['common']))
    }
  };
}
