import ThemeToggler from '@/components/atoms/buttons/ThemeToggler';
import LocaleSelector from '@/components/atoms/mixed/LocaleSelector';
import Footer from '@/components/layouts/Footer';

export default function MainFooter() {
  return (
    <>
      <Footer>
        <div className="flex w-full items-center justify-center gap-4">
          <span className="font-regular text-base">
            Made with ❤️ by{' '}
            <a href="https://devlify.io" target="_devlify_io">
              Devlify.io
            </a>
          </span>
          <ThemeToggler />
          <LocaleSelector />
        </div>
      </Footer>
    </>
  );
}
