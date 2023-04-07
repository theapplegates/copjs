import { zodResolver } from '@hookform/resolvers/zod';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from 'react-icons/hi';
import { z } from 'zod';
import { makeZodI18nMap } from 'zod-i18n-map';

import Alert from '@/components/atoms/alerts/Alert';
import Button from '@/components/atoms/buttons/Button';
import Card from '@/components/atoms/cards/Card';
import InputText from '@/components/atoms/inputs/InputText';
import H1 from '@/components/atoms/typography/headings/H1';
import Link from '@/components/atoms/typography/Link';
import Subtitle from '@/components/atoms/typography/Subtitle';
import Title from '@/components/atoms/typography/Title';
import BaseLayout from '@/components/layouts/BaseLayout';
import Loader from '@/components/loading/Loader';
import RequestPasswordLinkSchema from '@/schema/RequestPasswordLinkSchema';
import { trpc } from '@/utils/trpc';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'zod']))
    }
  };
};

export default function Index() {
  const router = useRouter();

  const { status } = useSession();
  const { t } = useTranslation();

  z.setErrorMap(makeZodI18nMap({ t, handlePath: { ns: ['common', 'zod'] } }));

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful }
  } = useForm<z.infer<typeof RequestPasswordLinkSchema>>({
    mode: 'onChange',
    resolver: zodResolver(RequestPasswordLinkSchema),
    defaultValues: {}
  });

  const { mutate } = trpc.auth.requestLink.useMutation();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/housekeeping');
    }
  }, [status, router]);

  const onSubmit = async (input: z.infer<typeof RequestPasswordLinkSchema>) => {
    await mutate(input);
  };

  // If the session is loading or authenticated, return the loading message
  if (status === 'loading' || status === 'authenticated') {
    return <Loader />;
  }

  // t('Reset password')

  return (
    <>
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

              {isSubmitSuccessful && (
                <Alert color="success">
                  {t(
                    "We've sent you an email with a link to reset your password."
                  )}
                </Alert>
              )}

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

                <Button
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                  isLoading={isSubmitting}
                  className="mb-2 mt-4 w-full justify-center"
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
