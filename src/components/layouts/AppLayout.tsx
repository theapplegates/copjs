import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';

import backgroundImage from '@/assets/images/bg.png';
import Button from '@/components/atoms/buttons/Button';
import Subtitle from '@/components/atoms/typography/Subtitle';
import Title from '@/components/atoms/typography/Title';
import MainFooter from '@/components/layouts/MainFooter';
import { useTheme } from '@/providers/ThemeProvider';

type Props = {
  children?: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  const { t } = useTranslation();

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
          <div className="lg:(py-[50px]) h-full w-full py-[50px] px-4">
            <div className="flex h-full w-full items-center justify-center">
              <div className="p-[50px]">
                <div>
                  <div className="mb-3">
                    {session && (
                      <>
                        <Title className="mb-1">{t('Dashboard')}</Title>
                        <Subtitle>
                          {t('Welcome, {{name}}!', {
                            name: session.user.name
                          })}
                        </Subtitle>
                        {session.user.role}
                      </>
                    )}
                  </div>

                  {!session && (
                    <Button
                      clickHandler={() => {
                        router.push(`/auth/signin`);
                      }}
                      size="small"
                      className="mb-3"
                    >
                      {t('Sign in')}
                    </Button>
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
