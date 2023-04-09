/* eslint-disable @typescript-eslint/no-shadow */
import deDE from './dictionaries/de-DE.json';
import enUS from './dictionaries/en-US.json';

export const defaultLocale = 'en-US';
export const locales = [defaultLocale, 'de-DE'] as const;

export const dictionariesClient: any = {
  'de-DE': deDE,
  'en-US': enUS
};

export type ValidLocale = (typeof locales)[number];

type PathnameLocale = {
  pathname: string;
  locale?: never;
};

type ISOLocale = {
  pathname?: never;
  locale: string;
};

type LocaleSource = PathnameLocale | ISOLocale;

export const getLocalePartsFrom = ({ pathname, locale }: LocaleSource) => {
  if (locale) {
    const localeParts = locale.toLowerCase().split('-');

    return {
      lang: localeParts[0],
      country: localeParts[1]
    };
  }

  const pathnameParts = pathname!.toLowerCase().split('/');

  return {
    lang: pathnameParts[1],
    country: pathnameParts[2]
  };
};

const dictionaries: Record<ValidLocale, any> = {} as Record<ValidLocale, any>;

// eslint-disable-next-line no-plusplus
for (let i = 0; i < locales.length; i++) {
  const locale = locales[i];

  dictionaries[locale as ValidLocale] = () =>
    import(`dictionaries/${locale}.json`).then(module => module.default);
}

export const getDictionaries = async (
  locale: ValidLocale,
  nullWhenInvalid: boolean = false
) => {
  const dictionary = dictionaries[locale] ? await dictionaries[locale]() : null;
  const def = nullWhenInvalid ? null : await dictionaries[defaultLocale]();

  return dictionary || def;
};

export const getDictionariesClient = (locale: any) => {
  return dictionariesClient[locale] || dictionariesClient['en-US'];
};
