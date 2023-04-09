'use client';

import backgroundImage from '@/assets/images/bg.png';
import MainFooter from '@/components/layouts/MainFooter';
import { useTheme } from '@/providers/ThemeProvider';

type Props = {
  children?: React.ReactNode;
};

export default function BaseLayout({ children }: Props) {
  const { theme } = useTheme();

  return (
    <>
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
        <div className="h-[calc(100%-90px)]">
          <div className="h-full w-full overflow-auto">
            <div className="flex min-h-full w-full flex-col items-center justify-center">
              <div className="w-full px-4 py-[50px]">{children}</div>
            </div>
          </div>
        </div>
        <MainFooter />
      </div>
    </>
  );
}
