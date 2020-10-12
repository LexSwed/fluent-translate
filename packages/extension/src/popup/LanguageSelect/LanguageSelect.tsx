import React from 'react';

import RecentLanguages, { useRecentLanguages } from './RecentLanguages';
import { Option, Select } from './styled';

type Props = {
  value: string;
  onChange: (value: string) => void;
  languages: Languages;
  size?: 'small';
};

const LanguageSelect: React.FC<Props> = ({ value, onChange, languages }) => {
  const [recent, addRecent] = useRecentLanguages();

  return (
    <Select
      value={value}
      onChange={(e: any) => {
        const { value } = e.target;

        addRecent(value);
        onChange(value);
      }}
    >
      <RecentLanguages recent={recent} languages={languages} />
      <optgroup label="Languages">
        {Object.entries(languages).map(([lang, { nativeName, name }]) => (
          <Option key={lang} value={lang} title={nativeName}>
            {name}
          </Option>
        ))}
      </optgroup>
    </Select>
  );
};

export default LanguageSelect;
