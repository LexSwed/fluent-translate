import React, { useMemo } from 'react';

import { LanguageSelect } from '../LanguageSelect';
import { useFromLanguage, useLanguages, useTranslation } from '../store/utils';

const FromLanguageSelect = () => {
  const [from, setFrom] = useFromLanguage();
  const languages = useLanguagesWithAuto(from);
  return (
    <LanguageSelect value={from} onChange={setFrom} languages={languages} />
  );
};

export default FromLanguageSelect;

function useLanguagesWithAuto(from: string) {
  const translation = useTranslation();
  const languages = useLanguages();

  return useMemo(() => {
    if (from === 'auto' && translation.from) {
      const suffix = ' | Auto';
      const lang = languages[translation.from];

      return {
        ...languages,
        auto: `${lang}${suffix}`,
      };
    }
    return languages;
  }, [from, languages, translation.from]);
}
