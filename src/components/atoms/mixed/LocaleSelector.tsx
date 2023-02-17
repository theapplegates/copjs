import { useTranslation } from 'next-i18next';

import Loader from '@/components/loading/Loader';
import { useLoading } from '@/providers/LoadingProvider';

export default function LocaleSelector() {
  const { isLoading, setLoading } = useLoading();

  const { i18n } = useTranslation();

  const languages = Object.keys(i18n.options.resources || []);

  const handleLocaleChange = async (locale: string) => {
    setLoading(true);

    i18n.changeLanguage(locale);

    setLoading(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {languages.map((lang, i: number) => (
        <div
          key={i}
          onClick={() => {
            handleLocaleChange(lang);
          }}
          className="cursor-pointer uppercase"
        >
          {lang}
        </div>
      ))}
    </>
  );
}
