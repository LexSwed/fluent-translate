import { useMemo } from 'react';
import { LanguageSelect } from './LanguageSelect';
import { useLocale } from '../../translations';
import { useSourceLanguage, useLanguages } from '../atoms';
import { useTranslation } from '../Translator';

export const SourceLanguageSelect = () => {
  const [from, setFrom] = useSourceLanguage();
  const translation = useTranslation();
  const languages = useLanguages();
  const t = useLocale();
  const languagesWithAuto = useMemo(() => {
    let { auto, ...langs } = languages;
    if (from === 'auto' && translation.from) {
      const suffix = ' | Auto';
      const lang = languages[translation.from];
      auto = `${lang}${suffix}`;
    }
    return { auto, ...langs };
  }, [from, languages, translation.from]);

  return (
    <LanguageSelect
      value={from}
      onChange={setFrom}
      languages={languagesWithAuto}
      label={t('popup.select.source-language')}
    />
  );
};
