import React from 'react';
import { useLocale } from '../../translations';
import { Option } from './styled';

type Props = {
  recent: string[];
  languages: Languages;
};

export const RecentLanguages: React.FC<Props> = ({ recent, languages }) => {
  const t = useLocale();
  if (!recent.length) {
    return null;
  }

  return (
    <optgroup label={t('popup.select.recent-languages')}>
      {recent.map(
        (lang) =>
          languages[lang] && (
            <Option key={lang} value={lang}>
              {languages[lang]}
            </Option>
          )
      )}
    </optgroup>
  );
};
