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
import Card from '@/components/atoms/cards/Card';
import Title from '@/components/atoms/typography/Title';
import Subtitle from '@/components/atoms/typography/Subtitle';
import Link from '@/components/atoms/typography/Link';
import H1 from '@/components/atoms/typography/headings/H1';
import InputText from '@/components/atoms/inputs/InputText';
import AlertDanger from '@/components/atoms/alerts/AlertDanger';

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

  const [isLoading, setLoading] = useState(false); // Loading state

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
    setLoading(true);

    // Sign in the user
    const result = await signIn('credentials', {
      email,
      password: hashPassword(password),
      redirect: false
    });

    // If the user is not authenticated
    if (result?.error) {
      // Set the error message
      setError(t('Invalid credentials.') || '');
      setLoading(false); // Stop loading

      return;
    }

    // Redirect to the housekeeping page if the user is authenticated
    router.push('/housekeeping');
  };

  // If the session is loading or authenticated, return the loading message
  if (status === 'loading' || status === 'authenticated') {
    return <>{t('Loading')}</>;
  }

  // Return the sign in page
  return (
    <>
      <Seo title={t('Sign in') || undefined} />

      <BaseLayout>
        <div className="flex h-full w-full items-center justify-center px-5">
          <div>
            <H1 className="text-center mb-6">{t('Welcome back')}</H1>
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
                <Title>{t('Welcome back')}</Title>
                <Subtitle>
                  {t("You don't have an account?")}{' '}
                  <Link href="/auth/signup">{t('Create one')}</Link>
                </Subtitle>
              </div>

              {error && <AlertDanger>{error}</AlertDanger>}
              <form
                onSubmit={async e => {
                  e.preventDefault();

                  await handleSignIn(email, password);
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

                <Button
                  color="primary"
                  type="submit"
                  isLoading={isLoading}
                  className="justify-center w-full my-2"
                >
                  {t('Sign in')}
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
