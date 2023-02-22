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
import Seo from '@/components/layouts/Seo';
import Loader from '@/components/loading/Loader';
import SignInButtons from '@/components/SignInButtons';
import RegistrationSchema from '@/schema/RegistrationSchema';
import { trpc } from '@/utils/trpc';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'zod']))
    }
  };
};

export default function SignUp() {
  const router = useRouter();

  const { t } = useTranslation();

  z.setErrorMap(makeZodI18nMap({ t, handlePath: { ns: ['common', 'zod'] } }));

  const { status } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<z.infer<typeof RegistrationSchema>>({
    mode: 'onChange',
    resolver: zodResolver(RegistrationSchema), // Configuration the validation with the zod schema.
    defaultValues: {}
  });

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/housekeeping');
    }
  }, [status, router]);

  const { mutate, data, error } = trpc.user.create.useMutation();

  useEffect(() => {
    (async () => {
      if (data) {
        await signIn('credentials', data);
      }
    })();
  }, [data, error]);

  const onSubmit = async (input: z.infer<typeof RegistrationSchema>) => {
    // Send the request to the API to create the user
    await mutate(input);
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

  return (
    <>
      <Seo title={t('Sign up') as string} />

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

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4">
                  <InputText
                    type="text"
                    autoFocus={true}
                    placeholder={t('Display name') as string}
                    floatingLabel={true}
                    className="w-full"
                    disabled={isSubmitting}
                    name="name"
                    register={register}
                  />
                </div>
                {errors?.name?.message && (
                  <Alert color="danger">{t(errors?.name?.message)}</Alert>
                )}

                <div className="mt-4">
                  <InputText
                    type="email"
                    placeholder={t('Email') as string}
                    floatingLabel={true}
                    className="w-full"
                    disabled={isSubmitting}
                    name="email"
                    register={register}
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
                    disabled={isSubmitting}
                    name="password"
                    register={register}
                  />
                </div>
                {errors?.password?.message && (
                  <Alert color="danger">{t(errors?.password?.message)}</Alert>
                )}

                <div className="mt-4">
                  <InputText
                    type="password"
                    placeholder={t('Confirm password') as string}
                    floatingLabel={true}
                    className="w-full"
                    disabled={isSubmitting}
                    name="passwordConfirm"
                    register={register}
                  />
                </div>
                {errors?.passwordConfirm?.message && (
                  <Alert color="danger">
                    {t(errors?.passwordConfirm?.message)}
                  </Alert>
                )}

                <Button
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                  isLoading={isSubmitting}
                  className="mt-4 mb-2 w-full justify-center"
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
