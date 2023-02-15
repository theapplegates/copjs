import backgroundImage from '@/assets/images/bg.png';
import { useTheme } from '@/providers/ThemeProvider';

import Footer from './Footer';

// The props for the base layout
type Props = {
  children?: React.ReactNode;
};

// The base layout
export default function BaseLayout({ children }: Props) {
  const { theme } = useTheme(); // Get the theme

  // Return the base layout
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
          <div className="lg:(py-[50px]) py-[50px] px-4">{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
