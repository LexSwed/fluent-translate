import React from 'react';
import cx from 'classnames';

import styles from './styles.css';
import RecentLanguages, { useRecentLanguages } from './RecentLanguages';

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
  const [recent, addRecent] = useRecentLanguages();

  return (
    <select
      value={value}
      onChange={(e) => {
        const { value } = e.target;

        addRecent(value);
        onChange(value);
      }}
      className={cx(styles.select, border && styles.withBorder)}
    >
      <RecentLanguages recent={recent} languages={languages} />
      <optgroup label="Languages">
        {Object.entries(languages).map(([lang, { nativeName, name }]) => (
          <option key={lang} value={lang} title={nativeName}>
            {name}
          </option>
        ))}
      </optgroup>
    </select>
  );
};

export default LanguageSelect;
