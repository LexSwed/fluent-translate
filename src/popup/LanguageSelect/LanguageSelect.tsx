import React from 'react';
import cx from 'classnames';

import styles from './styles.css';

type Props = {
  value: string;
  onChange: (value: string) => void;
  languages: Languages;
  border?: boolean;
};

const LanguageSelect: React.FC<Props> = ({
  value,
  onChange,
  languages,
  border
}) => {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className={cx(styles.select, border && styles.withBorder)}
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
