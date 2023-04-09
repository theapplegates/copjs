export const getTranslator = (dictionary: any) => {
  return (
    key: string,
    params?: { [key: string]: string | number | undefined }
  ) => {
    let translation = key
      .split('.')
      .reduce((obj, k) => obj && obj[k], dictionary);

    if (!translation) {
      return key;
    }

    if (params && Object.entries(params).length) {
      Object.entries(params).forEach(([k, value]) => {
        translation = translation!.replace(`{{ ${k} }}`, String(value || ''));
      });
    }

    return translation;
  };
};
