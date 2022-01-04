import { useMemo } from 'react';
import {
  useFromLanguage,
  useLanguages,
  useToLanguage,
  useTranslation,
} from '../atoms';

import RecentLanguages, { useRecentLanguages } from './RecentLanguages';
import { Option, Select } from './styled';

type Props = {
  value: string;
  onChange: (value: string) => void;
  languages: Languages;
};

const LanguageSelect: React.FC<Props> = ({ value, onChange, languages }) => {
  const [recent, addRecent] = useRecentLanguages();

  return (
    <Select
      value={value}
      title="Language select"
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
  const [to, setTo] = useToLanguage();
  const languages = useLanguages();
  return <LanguageSelect value={to} onChange={setTo} languages={languages} />;
};

export const FromLanguageSelect = () => {
  const [from, setFrom] = useFromLanguage();
  const translation = useTranslation();
  const languages = useLanguages();
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
    />
  );
};
