import { useRouter } from 'next/router';
import type { BuiltInProviderType } from 'next-auth/providers';
import type { ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import { getProviders, signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from 'react-icons/hi';

import Alert from '@/components/atoms/alerts/Alert';
import Button from '@/components/atoms/buttons/Button';
import Card from '@/components/atoms/cards/Card';
import HorizontalDivider from '@/components/atoms/divider/HorizontalDivider';
import InputText from '@/components/atoms/inputs/InputText';
import H1 from '@/components/atoms/typography/headings/H1';
import Link from '@/components/atoms/typography/Link';
import Subtitle from '@/components/atoms/typography/Subtitle';
import Title from '@/components/atoms/typography/Title';
import BaseLayout from '@/components/layouts/BaseLayout';
import Seo from '@/components/layouts/Seo';
import Loader from '@/components/loading/Loader';
import SignInButtons from '@/components/SignInButtons';
import { useLocale } from '@/providers/LocaleProvider';
import { trpc } from '@/utils/trpc';

// The sign up page
export default function SignUp() {
  const router = useRouter(); // Get the router

  const { t } = useLocale(); // Get the translation function

  const { status } = useSession(); // Get the session

  const [name, setName] = useState(''); // State for the display name
  const [email, setEmail] = useState(''); // State for the email address
  const [password, setPassword] = useState(''); // State for the password
  const [passwordConfirm, setPasswordConfirm] = useState(''); // State for the password confirmation

  useEffect(() => {
    // If the user is authenticated
    if (status === 'authenticated') {
      // Redirect to the housekeeping page
      router.push('/housekeeping');
    }
  }, [status, router]);

  const { mutate, isLoading, data, error } = trpc.user.create.useMutation();

  useEffect(() => {
    (async () => {
      // If the data is available
      if (data) {
        // Sign in the user
        await signIn('credentials', data);
      }
    })();
  }, [data, error]);

  const handleSignUp = async () => {
    // Send the request to the API to create the user
    mutate({ email, name, password });
  };

  // Get providers
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null); // State for the providers

  useEffect(() => {
    (async () => {
      // Get the providers and set the state
      setProviders(await getProviders());
    })();
  }, []);

  // If the session is loading or authenticated, return the loading message
  if (
    providers === null ||
    status === 'loading' ||
    status === 'authenticated'
  ) {
    return <Loader />;
  }

  // Return the sign up page
  return (
    <>
      <Seo title={t('Sign up') || undefined} />

      <BaseLayout>
        <div className="flex h-full w-full items-center justify-center">
          <div className="mx-auto w-full max-w-[410px]">
            <H1 className="mb-10 text-center">{t('Create an Account')}</H1>

            <SignInButtons providers={providers} />

            <HorizontalDivider>{t('or register with email')}</HorizontalDivider>

            <Card>
              <div className="my-5">
                <Title className="mb-2">{t('Create an Account')}</Title>
                <Subtitle>
                  {t('Already registered?')}{' '}
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
                    type="text"
                    id="name"
                    autoFocus={true}
                    placeholder={t('Display name')}
                    value={name}
                    changeHandler={event => setName(event.target.value)}
                    floatingLabel={true}
                    className="w-full"
                  />
                </div>
                <div className="mb-4">
                  <InputText
                    type="email"
                    id="email"
                    placeholder={t('Email')}
                    value={email}
                    changeHandler={event => setEmail(event.target.value)}
                    floatingLabel={true}
                    className="w-full"
                  />
                </div>
                <div className="mb-5">
                  <InputText
                    type="password"
                    id="password"
                    placeholder={t('Password')}
                    value={password}
                    changeHandler={event => setPassword(event.target.value)}
                    floatingLabel={true}
                    className="w-full"
                  />
                </div>
                <div className="mb-5">
                  <InputText
                    type="password"
                    id="password_confirm"
                    placeholder={t('Confirm password')}
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

              <Link
                href="/auth/signin"
                className="group mt-4 flex w-full items-center justify-center gap-2"
              >
                <div className="inline-block duration-300 group-hover:pr-1">
                  <HiOutlineArrowSmLeft />
                </div>{' '}
                {t('Back to sign in')}
              </Link>
            </Card>
          </div>
        </div>
      </BaseLayout>
    </>
  );
}
