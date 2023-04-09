'use client';

import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import AppLayout from '@/components/layouts/AppLayout';
import Loader from '@/components/loading/Loader';
import { getDictionariesClient } from '@/i18n';
import { getTranslator } from '@/utils/localization';

export default function PageClient() {
  const router = useRouter();
  const params = useParams();

  const { status } = useSession();

  const t = getTranslator(getDictionariesClient(params?.lang));

  useEffect(() => {
    if (status === 'authenticated') {
      router.push(`${params?.lang}/housekeeping`);
    }
  }, [status]);

  const [initialRenderComplete, setInitialRenderComplete] =
    useState<boolean>(false);

  // Wait for the initial render to complete
  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);

  if (status === 'loading' || status === 'authenticated') {
    return <Loader />;
  }

  // If the initial render is not complete, return an empty fragment
  if (!initialRenderComplete) {
    return (
      <>
        <Loader />
      </>
    );
  }

  // If the initial render is complete, return the page
  return (
    <AppLayout>
      <div className="mb-2">{t('not_signed_in')}</div>
    </AppLayout>
  );
}
