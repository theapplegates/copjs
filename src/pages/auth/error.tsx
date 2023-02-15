import type { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Loading from '@/components/loading/Loading';
import SignIn from '@/pages/auth/signin';

// The error page for invalid credentials
export default function Error() {
  const router = useRouter(); // Get the router

  const { status } = useSession(); // Get the session

  const { t } = useTranslation(); // Get the translation function

  // If the user is authenticated, redirect to the housekeeping page
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/housekeeping');
    }
  }, [status, router]);

  // If the session is loading or authenticated, return the loading message
  if (status === 'loading' || status === 'authenticated') {
    return <Loading />;
  }

  // Return the sign in page
  return (
    <>
      <SignIn errorMessage={t('Invalid credentials.') || ''} />
    </>
  );
}

// Get the providers and translations
export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale as string, [
        'common',
        'auth'
      ]))
    }
  };
}
