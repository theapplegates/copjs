import type { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@/components/atoms/buttons/Button';
import AppLayout from '@/components/layouts/AppLayout';
import Seo from '@/components/layouts/Seo';

// The housekeeping page
export default function Index() {
  const router = useRouter(); // Get the router

  const { t } = useTranslation(); // Get the translation function

  const { data: session, status } = useSession(); // Get the session

  useEffect(() => {
    // If the user is not authenticated
    if (status === 'unauthenticated') {
      // Redirect to the homepage
      router.push('/');
    }
  }, [status, router]);

  // If the session is loading or unauthenticated, return the loading message
  if (status === 'loading' || status === 'unauthenticated') {
    return <>{t('Loading')}</>;
  }

  // Return the housekeeping page
  return (
    <>
      <Seo title={'App'} />
      <AppLayout>
        <div className="flex items-center gap-2">
          {Boolean(session?.user?.image) && (
            <Image
              alt=""
              src={session?.user?.image as string}
              className="rounded-full"
              width={80}
              height={80}
            />
          )}

          <div>
            <div className="">
              {t('Signed in as {{email}}', {
                email: session?.user?.email ?? ''
              })}
            </div>

            <Button
              color={'secondary'}
              className="my-2"
              clickHandler={() => {
                signOut({
                  callbackUrl: `/${router.locale || ''}`,
                  redirect: true
                });
              }}
            >
              {t('Sign out')}
            </Button>
          </div>
        </div>
      </AppLayout>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? 'en', ['common']))
    }
  };
}
