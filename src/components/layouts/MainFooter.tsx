import ThemeToggler from '@/components/atoms/buttons/ThemeToggler';
import LocaleSelector from '@/components/atoms/mixed/LocaleSelector';
import Footer from '@/components/layouts/Footer';
import { trpc } from '@/utils/trpc';

export default function MainFooter() {
  const { data: buildVersion } = trpc.build.version.useQuery();

  return (
    <>
      <Footer>
        <div className="flex w-full items-center justify-center gap-4">
          <div>
            Made with ❤️ by{' '}
            <a href="https://devlify.io" target="_devlify_io">
              Devlify.io
            </a>
          </div>
          {buildVersion && buildVersion.length > 0 && (
            <div>
              <div className="inline-block rounded bg-gray-50 p-1 text-[11px]">
                {buildVersion}
              </div>
            </div>
          )}
          <ThemeToggler />
          <LocaleSelector />
        </div>
      </Footer>
    </>
  );
}
