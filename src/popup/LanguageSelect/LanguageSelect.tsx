import React from 'react';

import styles from './styles.css';
import { useLanguages } from '../AppContext';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const LanguageSelect: React.FC<Props> = ({ value, onChange }) => {
  const languages = useLanguages();

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
