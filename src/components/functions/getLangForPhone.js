const getCountryByLang = (lang) => {
  const langToCountry = {
    en: 'GB',
    ru: 'RU',
    es: 'ES',
    de: 'DE',
    fr: 'FR',
    it: 'IT',
    pl: 'PL',
    zh: 'CN',
    tr: 'TR',
    hi: 'IN',
    pt: 'PT',
    ar: 'SA',
    ja: 'JP',
    fa: 'IR',
  };
  return langToCountry[lang] || 'GB';
};

export default getCountryByLang;
