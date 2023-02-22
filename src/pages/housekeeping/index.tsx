import type { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';

import Button from '@/components/atoms/buttons/Button';
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

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  // If the session is loading or unauthenticated, return the loading message
  if (status === 'loading' || status === 'unauthenticated') {
    return <Loader />;
  }

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
              priority
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
              size="small"
              clickHandler={() => {
                signOut({
                  callbackUrl: `/`,
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
