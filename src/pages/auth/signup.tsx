import type { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import { HiOutlineArrowSmRight } from 'react-icons/hi';

import AlertDanger from '@/components/atoms/alerts/AlertDanger';
import Button from '@/components/atoms/buttons/Button';
import Card from '@/components/atoms/cards/Card';
import InputText from '@/components/atoms/inputs/InputText';
import H1 from '@/components/atoms/typography/headings/H1';
import Link from '@/components/atoms/typography/Link';
import Subtitle from '@/components/atoms/typography/Subtitle';
import Title from '@/components/atoms/typography/Title';
import BaseLayout from '@/components/layouts/BaseLayout';
import Seo from '@/components/layouts/Seo';
import Loading from '@/components/loading/Loading';
import SignInButtons from '@/components/SignInButtons';
import { isValidEmail } from '@/utils/validate';

// The sign up page
export default function SignUp() {
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

  const handleSignUp = async () => {
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
    return <Loading />;
  }

  // Return the sign up page
  return (
    <>
      <Seo title={t('Sign up') || undefined} />

      <BaseLayout>
        <div className="flex h-full w-full items-center justify-center px-5">
          <div>
            <H1 className="mb-6 text-center">{t('Create an Account')}</H1>
            <SignInButtons />

            <Card className="max-w-full md:min-w-[410px]">
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
                  await handleSignUp();
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
                  className="my-2 w-full justify-center"
                  rightIcon={<HiOutlineArrowSmRight />}
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
  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? 'en', ['common']))
    }
  };
}
