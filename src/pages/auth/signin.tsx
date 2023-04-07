import { zodResolver } from '@hookform/resolvers/zod';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import type { BuiltInProviderType } from 'next-auth/providers';
import type { ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import { getProviders, signIn, useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from 'react-icons/hi';
import { z } from 'zod';
import { makeZodI18nMap } from 'zod-i18n-map';

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
import Loader from '@/components/loading/Loader';
import SignInButtons from '@/components/SignInButtons';
import SignInInputSchema from '@/schema/SignInInputSchema';
import { hashPassword } from '@/utils/hash';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'zod']))
    }
  };
};

export default function SignIn() {
  const router = useRouter();

  const [error, setError] = useState('');

  const { t } = useTranslation();

  z.setErrorMap(makeZodI18nMap({ t, handlePath: { ns: ['common', 'zod'] } }));

  const { status } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<z.infer<typeof SignInInputSchema>>({
    mode: 'onChange',
    resolver: zodResolver(SignInInputSchema),
    defaultValues: {}
  });

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/housekeeping');
      return;
    }

    if (router.query.error) {
      setError(router.query.error as string);
    }
  }, [status, router]);

  const onSubmit = async (input: z.infer<typeof SignInInputSchema>) => {
    const result = await signIn('credentials', {
      email: input.email,
      password: hashPassword(input.password),
      redirect: false
    });

    if (result?.error) {
      setError('Invalid credentials.');

      return;
    }

    router.push('/housekeeping');
  };

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    (async () => {
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

  // t('Sign in')

  return (
    <>
      <BaseLayout>
        <div className="flex h-full w-full items-center justify-center">
          <div className="mx-auto w-full max-w-[410px]">
            <H1 className="mb-10 text-center">{t('Welcome back')}</H1>

            <SignInButtons providers={providers} />

            <HorizontalDivider>{t('or sign in with email')}</HorizontalDivider>

            <Card>
              <div className="my-5">
                <Title className="mb-2">{t('Welcome back')}</Title>
                <Subtitle>
                  {t("You don't have an account?")}{' '}
                  <Link href="/auth/signup">{t('Create one')}</Link>
                </Subtitle>
              </div>

              {error.length > 0 && <Alert color="danger">{t(error)}</Alert>}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4">
                  <InputText
                    type="email"
                    autoFocus={true}
                    placeholder={t('Email') as string}
                    floatingLabel={true}
                    className="w-full"
                    name="email"
                    register={register}
                    disabled={isSubmitting}
                  />
                </div>
                {errors?.email?.message && (
                  <Alert color="danger">{t(errors?.email?.message)}</Alert>
                )}

                <div className="mt-4">
                  <InputText
                    type="password"
                    placeholder={t('Password') as string}
                    floatingLabel={true}
                    className="w-full"
                    name="password"
                    register={register}
                    disabled={isSubmitting}
                  />
                </div>
                {errors?.password?.message && (
                  <Alert color="danger">{t(errors?.password?.message)}</Alert>
                )}

                <Link href="/auth/forgot-password" className="my-5 block">
                  {t('Forgot password?')}
                </Link>

                <Button
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                  isLoading={isSubmitting}
                  className="my-2 w-full justify-center"
                  rightIcon={<HiOutlineArrowSmRight />}
                >
                  {t('Sign in')}
                </Button>
              </form>

              <Link
                href="/"
                className="group mt-4 flex w-full items-center justify-center gap-2"
              >
                <div className="inline-block duration-300 group-hover:pr-1">
                  <HiOutlineArrowSmLeft />
                </div>
                {t('Back to homepage')}
              </Link>
            </Card>
          </div>
        </div>
      </BaseLayout>
    </>
  );
}
