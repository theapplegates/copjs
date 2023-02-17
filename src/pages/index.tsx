import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import AppLayout from '@/components/layouts/AppLayout';
import Seo from '@/components/layouts/Seo';
import Loader from '@/components/loading/Loader';
import { useLocale } from '@/providers/LocaleProvider';

// The index page
export default function Index() {
  const router = useRouter(); // Get the router

  const { t } = useLocale(); // Get the translation function

  const { status } = useSession(); // Get the session

  useEffect(() => {
    // If the user is authenticated
    if (status === 'authenticated') {
      router.push('/housekeeping'); // Redirect to the housekeeping page
    }
  }, [status]);

  // If the session is loading or authenticated, return the loading message
  if (status === 'loading' || status === 'authenticated') {
    return <Loader />;
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
