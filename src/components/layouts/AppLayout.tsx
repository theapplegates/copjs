import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { MdOutlineDarkMode, MdOutlineLight } from 'react-icons/md';

import { useTheme } from '@/providers/ThemeProvider';

import Button from '@/components/atoms/buttons/Button';
import Subtitle from '@/components/atoms/typography/Subtitle';
import Title from '@/components/atoms/typography/Title';

// The props for the app layout
type Props = {
  children?: React.ReactNode;
};

// The app layout
export default function AppLayout({ children }: Props) {
  const { t } = useTranslation(); // Get the translation function

  const { data: session } = useSession(); // Get the session

  const router = useRouter(); // Get the router

  const { theme, toggleTheme } = useTheme(); // Get the theme

  // Return the app layout
  return (
    <div className="dark:(bg-gray-900 text-white) h-full w-full bg-white">
      <div className="flex w-full">
        <div className="w-[250px] py-6 px-10">
          <div className="text-2xl font-bold">LOGO</div>
        </div>
        <div className="w-full px-10 pt-12 pb-6">
          <div className="grid grid-cols-2 gap-2">
            <div>
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
            <div className="text-right">
              <div className="flex justify-end gap-2">
                <Button clickHandler={() => toggleTheme()}>
                  {theme === 'dark' ? (
                    <MdOutlineDarkMode />
                  ) : (
                    <MdOutlineLight />
                  )}
                </Button>
                {session ? (
                  <Button
                    clickHandler={() => {
                      signOut({
                        callbackUrl: `/${router.locale || ''}`,
                        redirect: true
                      });
                    }}
                  >
                    {t('Sign out')}
                  </Button>
                ) : (
                  <Button
                    clickHandler={() => {
                      router.push(`/auth/signin`);
                    }}
                  >
                    {t('Sign in')}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full">
        <div className="w-[250px] py-6 px-10">
          <Button className="mb-3 w-full">{t('Dashboard')}</Button>
        </div>
        <div className="py-6 px-4">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
