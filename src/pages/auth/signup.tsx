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
import { isValidEmail } from '@/utils/validate';

// The props
type Props = {
  providers: any[];
};

// The sign up page
export default function SignUp({ providers }: Props) {
  const router = useRouter(); // Get the router

  const { t } = useTranslation(); // Get the translation function

  const { status } = useSession(); // Get the session

  const [email, setEmail] = useState(''); // State for the email address
  const [password, setPassword] = useState(''); // State for the password
  const [passwordConfirm, setPasswordConfirm] = useState(''); // State for the password confirmation
  const [error, setError] = useState(''); // State for the error message

  useEffect(() => {
    // If the user is authenticated
    if (status === 'authenticated') {
      // Redirect to the housekeeping page
      router.push('/housekeeping');
    }
  }, [status, router]);

  const handleSignUp = async (email: string, password: string) => {
    // Validation
    if (!isValidEmail(email)) {
      return setError(t('Invalid email address.') || '');
    }

    if (email.length > 100) {
      return setError(t('Email address to long.') || '');
    }

    if (password.length < 6) {
      return setError(t('Password to short.') || '');
    }

    if (password.length > 100) {
      return setError(t('Password to long.') || '');
    }

    if (password !== passwordConfirm) {
      return setError(t('Password confirmation incorrect.') || '');
    }

    // Send the request to the API to create the user
    const response = await fetch('/api/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    // Get the data from the response
    const data = await response.json();

    // Check response status
    if (response.status === 200) {
      // Sign in the user
      await signIn('credentials', data);

      return;
    }

    // Set the error message
    setError(t('The email address already exists.') || '');
  };

  // If the session is loading or authenticated, return the loading message
  if (status === 'loading' || status === 'authenticated') {
    return <>{t('Loading')}</>;
  }

  // Return the sign up page
  return (
    <>
      <Seo title={t('Sign up') || undefined} />

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

                await handleSignUp(email, password);
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
              <div>
                <label htmlFor="password_confirm">
                  {t('Confirm password')}
                </label>
                <div>
                  <input
                    type="password"
                    id="password_confirm"
                    value={passwordConfirm}
                    onChange={event => setPasswordConfirm(event.target.value)}
                    className="p-2 border dark:text-black"
                  />
                </div>
              </div>
              <Button color="primary" type="submit" className="my-2">
                {t('Sign up')}
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
