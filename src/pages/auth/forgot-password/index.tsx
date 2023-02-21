import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from 'react-icons/hi';

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
import Loader from '@/components/loading/Loader';
import { useLocale } from '@/providers/LocaleProvider';
import { trpc } from '@/utils/trpc';

// The sign in page
export default function Index() {
  const router = useRouter(); // Get the router

  const { t } = useLocale(); // Get the translation function

  const { status } = useSession(); // Get the session

  const [email, setEmail] = useState(''); // State for the email address

  const { mutate, isLoading, data, error } =
    trpc.auth.requestLink.useMutation();

  useEffect(() => {
    // If the user is authenticated
    if (status === 'authenticated') {
      // Redirect to the housekeeping page
      router.push('/housekeeping');
    }
  }, [status, router]);

  const handleForgotPassword = async () => {
    mutate({ email });
  };

  // If the session is loading or authenticated, return the loading message
  if (status === 'loading' || status === 'authenticated') {
    return <Loader />;
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

              {error && error.message && error.message.startsWith('[') && (
                <Alert color="danger">
                  {JSON.parse(error.message).map((err: any, i: number) => (
                    <div key={i}>{t(err.message)}</div>
                  ))}
                </Alert>
              )}

              {data && (
                <Alert color="success">
                  {t(
                    "We've sent you an email with a link to reset your password."
                  )}
                </Alert>
              )}

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
                    placeholder={t('Email')}
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
                href="/auth/signin"
                className="group mt-4 flex w-full items-center justify-center gap-2"
              >
                <div className="inline-block duration-300 group-hover:pr-1">
                  <HiOutlineArrowSmLeft />
                </div>
                {t('Back to sign in')}
              </Link>
            </Card>
          </div>
        </div>
      </BaseLayout>
    </>
  );
}
