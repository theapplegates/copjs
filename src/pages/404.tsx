import { useRouter } from 'next/router';

import Button from '@/components/atoms/buttons/Button';
import H1 from '@/components/atoms/typography/headings/H1';
import BaseLayout from '@/components/layouts/BaseLayout';
import Seo from '@/components/layouts/Seo';
import { useLocale } from '@/providers/LocaleProvider';

// The 404 page
export default function Error404() {
  const router = useRouter(); // Get the router

  const { t } = useLocale(); // Get the translation function

  return (
    <>
      <Seo title={t('Page not found')} />
      <BaseLayout>
        <div className="flex h-full w-full items-center justify-center">
          <div>
            <H1 className="mb-3">{t('Page not found')}</H1>
            <div>
              <Button
                color={'primary'}
                className={'my-2 w-full justify-center'}
                size="small"
                clickHandler={() => {
                  router.push('/');
                }}
              >
                {t('Back to homepage')}
              </Button>
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
}
