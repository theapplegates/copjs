import type { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from 'react-icons/hi';

import { isValidEmail } from '@/utils/validate';

import Alert from '@/components/atoms/alerts/Alert';
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

// The sign in page
export default function Index() {
  const router = useRouter(); // Get the router

  const { t } = useTranslation(); // Get the translation function

  const { status } = useSession(); // Get the session

  const [isLoading, setLoading] = useState(false); // Loading state

  const [email, setEmail] = useState(''); // State for the email address

  const [success, setSuccess] = useState(''); // State for the success message
  const [error, setError] = useState(''); // State for the error message

  useEffect(() => {
    // If the user is authenticated
    if (status === 'authenticated') {
      // Redirect to the housekeeping page
      router.push('/housekeeping');
    }
  }, [status, router]);

  const handleForgotPassword = async () => {
    setLoading(true);

    // Validation
    if (!isValidEmail(email)) {
      setError(t('Invalid email address.') || '');
      setSuccess('');
      setLoading(false);
      return;
    }

    // Send the email address to the API to send a password reset email
    const response = await fetch('/api/auth/request-reset-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    // If the user is not authenticated
    if (response.status !== 200) {
      setSuccess(''); // Clear the success message

      // Set the error message
      setError(t('This email address is not registered.') || '');
      setLoading(false); // Stop loading

      return;
    }

    setError(''); // Clear the error message

    // Set the success message
    setSuccess(
      t("We've sent you an email with a link to reset your password.") || ''
    );

    setLoading(false); // Stop loading
  };

  // If the session is loading or authenticated, return the loading message
  if (status === 'loading' || status === 'authenticated') {
    return <Loading />;
  }

  // Return the sign in page
  return (
    <>
      <Seo title={t('Reset password') || undefined} />

      <BaseLayout>
        <div className="flex h-full w-full items-center justify-center">
          <div className="mx-auto w-full max-w-[410px]">
            <H1 className="mb-10 text-center">{t('Reset password')}</H1>

            <Card>
              <div className="my-5">
                <Title className="mb-2">{t('Reset your password')}</Title>
                <Subtitle>
                  {t('You remember your password again?')}{' '}
                  <Link href="/auth/signin">{t('Sign in')}</Link>
                </Subtitle>
              </div>

              {error && <Alert color="danger">{error}</Alert>}
              {success && <Alert color="success">{success}</Alert>}

              <form
                onSubmit={async e => {
                  e.preventDefault();

                  await handleForgotPassword();
                }}
              >
                <div className="mb-5">
                  <InputText
                    type="email"
                    id="email"
                    autoFocus={true}
                    placeholder={t('Email') || ''}
                    value={email}
                    changeHandler={event => setEmail(event.target.value)}
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
                  {t('Send reset link')}
                </Button>
              </form>

              <Link
                href="/"
                className="group mt-4 flex w-full items-center justify-center gap-2"
              >
                <div className="inline-block duration-300 group-hover:pr-1">
                  <HiOutlineArrowSmLeft />
                </div>{' '}
                {t('Back to homepage')}
              </Link>
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
