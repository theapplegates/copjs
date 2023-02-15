import { MdOutlineDarkMode, MdOutlineLight } from 'react-icons/md';

import Button from '@/components/atoms/buttons/Button';
import { useTheme } from '@/providers/ThemeProvider';

export default function Footer() {
  const { theme, toggleTheme } = useTheme(); // Get the theme

  return (
    <>
      <div className="text-ebony dark:(bg-ebony-400 text-white) flex h-[90px] w-full items-center justify-center bg-white">
        <div className="flex w-full items-center justify-center gap-4">
          <span className="font-regular text-base">
            Made with ❤️ by{' '}
            <a href="https://devlify.io" target="_devlify_io">
              Devlify.io
            </a>
          </span>
          <Button clickHandler={() => toggleTheme()} size="small">
            {theme === 'dark' ? <MdOutlineDarkMode /> : <MdOutlineLight />}
          </Button>
        </div>
      </div>
    </>
  );
}
