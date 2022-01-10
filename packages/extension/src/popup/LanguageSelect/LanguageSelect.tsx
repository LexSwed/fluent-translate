import { useMemo } from 'react';
import { useLocale } from '../../translations';
import { useSourceLanguage, useLanguages, useTargetLanguage } from '../atoms';
import { useTranslation } from '../Translator';

import RecentLanguages, { useRecentLanguages } from './RecentLanguages';
import { Option, Select } from './styled';

type Props = {
  value: string;
  onChange: (value: string) => void;
  languages: Languages;
  label: string;
};

const LanguageSelect: React.FC<Props> = ({
  label,
  value,
  onChange,
  languages,
}) => {
  const [recent, addRecent] = useRecentLanguages();

  return (
    <Select
      value={value}
      aria-label={label}
      title={label}
      onChange={(e) => {
        const { value } = e.target;
        addRecent(value);
        onChange(value);
      }}
    >
      <RecentLanguages recent={recent} languages={languages} />
      <optgroup label="Languages">
        {Object.entries(languages).map(([lang, name]) => (
          <Option key={lang} value={lang}>
            {name}
          </Option>
        ))}
      </optgroup>
    </Select>
  );
};

export const ToLanguageSelect = () => {
  const [to, setTo] = useTargetLanguage();
  const languages = useLanguages();
  const t = useLocale();
  return (
    <LanguageSelect
      value={to}
      onChange={setTo}
      languages={languages}
      label={t('popup.select.target-language')}
    />
  );
};

export const FromLanguageSelect = () => {
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
