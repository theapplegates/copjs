import ThemeToggler from '../atoms/buttons/ThemeToggler';
import Footer from './Footer';

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
        </div>
      </Footer>
    </>
  );
}
