import type { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { getProviders, signIn, useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import { FaDiscord } from 'react-icons/fa';

import Button from '@/components/atoms/buttons/Button';
import BaseLayout from '@/components/layouts/BaseLayout';
import Seo from '@/components/layouts/Seo';
import { hashPassword } from '@/utils/hash';

// The props for the sign in page
type Props = {
  providers: any[];
  errorMessage?: string;
};

// The sign in page
export default function SignIn({ providers, errorMessage = '' }: Props) {
  const router = useRouter(); // Get the router

  const { t } = useTranslation(); // Get the translation function

  const { status } = useSession(); // Get the session

  const [email, setEmail] = useState(''); // State for the email address
  const [password, setPassword] = useState(''); // State for the password
  const [error, setError] = useState(errorMessage); // State for the error message

  useEffect(() => {
    // If the user is authenticated
    if (status === 'authenticated') {
      // Redirect to the housekeeping page
      router.push('/housekeeping');
    }
  }, [status, router]);

  const handleSignIn = async (email: string, password: string) => {
    // Sign in the user
    const result = await signIn('credentials', {
      email,
      password: hashPassword(password),
      redirect: false
    });

    if (result?.error) {
      // Redirect the user when credentials are valid
      return setError(t('Invalid credentials.') || '');
    }

    // Set the error message when the credentials are invalid
    router.push('/housekeeping');
  };

  // If the session is loading, return an empty fragment
  if (status === 'loading' || status === 'authenticated') {
    return <>{t('Loading')}</>;
  }

  // Return the sign in page
  return (
    <>
      <Seo title={t('Sign in') || undefined} />

      <BaseLayout>
        <div className="flex h-full w-full items-center justify-center">
          <div>
            {error && (
              <div className="bg-red-100 text-red-900 my-2 p-2 rounded">
                {error}
              </div>
            )}
            <form
              onSubmit={async e => {
                e.preventDefault();

                await handleSignIn(email, password);
              }}
            >
              <div>
                <label htmlFor="email">{t('Email')}</label>
                <div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    className="p-2 border dark:text-black"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password">{t('Password')}</label>
                <div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    className="p-2 border dark:text-black"
                  />
                </div>
              </div>

              <Button color="primary" type="submit" className="my-2">
                {t('Sign in')}
              </Button>
            </form>

            {Object.values(providers)
              .filter((provider: any) => provider.name !== 'Credentials')
              .map((provider: any) => (
                <div key={provider.name}>
                  <Button
                    color="cornflower-blue"
                    clickHandler={() => signIn(provider.id)}
                    icon={
                      (provider.id === 'discord' && <FaDiscord size={24} />) ||
                      null
                    }
                  >
                    {t('Sign in with {{provider}}', {
                      provider: provider.name
                    })}
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </BaseLayout>
    </>
  );
}

// Get the server side props
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const providers: any = await getProviders();

  return {
    props: {
      providers: Object.values(providers) ?? [],
      ...(await serverSideTranslations(context.locale ?? 'en', ['common']))
    }
  };
}
