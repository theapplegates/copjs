'use client';

import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import backgroundImage from '@/assets/images/bg.png';
import Button from '@/components/atoms/buttons/Button';
import Subtitle from '@/components/atoms/typography/Subtitle';
import Title from '@/components/atoms/typography/Title';
import MainFooter from '@/components/layouts/MainFooter';
import { getDictionariesClient } from '@/i18n';
import { useTheme } from '@/providers/ThemeProvider';
import { getTranslator } from '@/utils/localization';

type Props = {
  children?: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  const params = useParams();

  const t = getTranslator(getDictionariesClient(params?.lang));

  const { data: session } = useSession();

  const router = useRouter();
  const { theme } = useTheme();

  return (
    <div
      className="dark:(bg-ebony text-white) selection:(bg-primary text-white) h-full w-full"
      style={
        theme === 'dark'
          ? {
              backgroundColor: '#101828',
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }
          : {
              backgroundImage: `url(${backgroundImage.src})`,
              backgroundColor: '#ECF3FB',
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }
      }
    >
      <div className="h-[calc(100%-90px)] overflow-auto">
        <div className="h-full w-full overflow-auto">
          <div className="lg:(py-[50px]) h-full w-full px-4 py-[50px]">
            <div className="flex h-full w-full items-center justify-center">
              <div className="p-[50px]">
                <div className="text-center">
                  {session && (
                    <>
                      <div className="mb-3">
                        <Title className="mb-1">{t('dashboard')}</Title>
                        <Subtitle>
                          {t('welcome', { value: session.user.name as string })}
                        </Subtitle>
                        <div>{session.user.role}</div>
                      </div>
                    </>
                  )}

                  {!session && (
                    <div className="mb-3 inline-block">
                      <Button
                        clickHandler={() => {
                          router.push(`${params?.lang}/auth/signin`);
                        }}
                        size="small"
                      >
                        {t('sign_in')}
                      </Button>
                    </div>
                  )}

                  <div className="relative">{children}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MainFooter />
    </div>
  );
}
