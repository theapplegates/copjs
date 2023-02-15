import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';

import backgroundImage from '@/assets/images/bg.png';
import Button from '@/components/atoms/buttons/Button';
import Subtitle from '@/components/atoms/typography/Subtitle';
import Title from '@/components/atoms/typography/Title';
import { useTheme } from '@/providers/ThemeProvider';

import Footer from './Footer';

// The props for the app layout
type Props = {
  children?: React.ReactNode;
};

// The app layout
export default function AppLayout({ children }: Props) {
  const { t } = useTranslation(); // Get the translation function

  const { data: session } = useSession(); // Get the session

  const router = useRouter(); // Get the router

  const { theme } = useTheme(); // Get the theme

  // Return the app layout
  return (
    <div
      className="dark:(bg-gray-900 text-white) selection:(bg-primary text-white) h-full w-full"
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

                  {session ? (
                    <Button
                      clickHandler={() => {
                        signOut({
                          callbackUrl: `/${router.locale || ''}`,
                          redirect: true
                        });
                      }}
                      size="small"
                      className="mb-3"
                    >
                      {t('Sign out')}
                    </Button>
                  ) : (
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
      <Footer />
    </div>
  );
}
