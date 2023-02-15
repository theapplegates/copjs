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
import AlertDanger from '@/components/atoms/alerts/AlertDanger';
import H1 from '@/components/atoms/typography/headings/H1';
import Card from '@/components/atoms/cards/Card';
import Link from '@/components/atoms/typography/Link';
import Subtitle from '@/components/atoms/typography/Subtitle';
import Title from '@/components/atoms/typography/Title';
import InputText from '@/components/atoms/inputs/InputText';

// The props
type Props = {
  providers: any[];
};

// The sign up page
export default function SignUp({ providers }: Props) {
  const router = useRouter(); // Get the router

  const { t } = useTranslation(); // Get the translation function

  const { status } = useSession(); // Get the session

  const [isLoading, setLoading] = useState(false); // Loading state

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
    setLoading(true);

    // Validation
    if (!isValidEmail(email)) {
      setError(t('Invalid email address.') || '');
      setLoading(false);
      return;
    }

    if (email.length > 100) {
      setError(t('Email address to long.') || '');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError(t('Password to short.') || '');
      setLoading(false);
      return;
    }

    if (password.length > 100) {
      setError(t('Password to long.') || '');
      setLoading(false);
      return;
    }

    if (password !== passwordConfirm) {
      setError(t('Password confirmation incorrect.') || '');
      setLoading(false);
      return;
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

    // When the registration failed
    setError(t('The email address already exists.') || ''); // Set the error message
    setLoading(false); // Stop loading
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
        <div className="flex h-full w-full items-center justify-center px-5">
          <div>
            <H1 className="text-center mb-6">{t('Create an Account')}</H1>
            {Object.values(providers)
              .filter((provider: any) => provider.name !== 'Credentials')
              .map((provider: any) => (
                <div key={provider.name}>
                  <Button
                    className="justify-center w-full mb-3 !py-2"
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

            <Card className="md:min-w-[350px] max-w-full">
              <div className="mb-3">
                <Title>{t('Create an Account')}</Title>
                <Subtitle>
                  {t('Already registered?')}{' '}
                  <Link href="/auth/signin">{t('Sign in')}</Link>
                </Subtitle>
              </div>

              {error && <AlertDanger>{error}</AlertDanger>}
              <form
                onSubmit={async e => {
                  // Prevent the default behaviour
                  e.preventDefault();

                  // Handle the sign up
                  await handleSignUp(email, password);
                }}
              >
                <div className="mb-4">
                  <InputText
                    type="email"
                    id="email"
                    placeholder={t('Email') || ''}
                    value={email}
                    changeHandler={event => setEmail(event.target.value)}
                    floatingLabel={true}
                    className="w-full"
                  />
                </div>
                <div className="mb-4">
                  <InputText
                    type="password"
                    id="password"
                    placeholder={t('Password') || ''}
                    value={password}
                    changeHandler={event => setPassword(event.target.value)}
                    floatingLabel={true}
                    className="w-full"
                  />
                </div>
                <div className="mb-4">
                  <InputText
                    type="password"
                    id="password_confirm"
                    placeholder={t('Confirm password') || ''}
                    value={passwordConfirm}
                    changeHandler={event =>
                      setPasswordConfirm(event.target.value)
                    }
                    floatingLabel={true}
                    className="w-full"
                  />
                </div>
                <Button
                  color="primary"
                  type="submit"
                  isLoading={isLoading}
                  className="justify-center w-full my-2"
                >
                  {t('Sign up')}
                </Button>
              </form>
            </Card>
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
