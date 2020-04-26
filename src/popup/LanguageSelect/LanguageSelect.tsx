import React from 'react';

import styles from './styles.css';

type Props = {
  value: string;
  onChange: (value: string) => void;
  languages: Languages;
};

const LanguageSelect: React.FC<Props> = ({ value, onChange, languages }) => {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className={styles.select}
    >
      {Object.entries(languages).map(([lang, { nativeName, name }]) => (
        <option key={lang} value={lang} title={nativeName}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelect;
