import React from 'react';
import { Box } from '@fxtrot/edge';

import styles from './styles.css';

import LanguageSelect from '../LanguageSelect';
import { useFromLanguage, useLanguages, useTranslation } from '../store/utils';

const FromLanguageSelect: React.FC = () => {
  const [from, setFrom] = useFromLanguage();
  let languages = useLanguages();
  const translation = useTranslation();

  if (from === 'auto' && translation.from) {
    const suffix = ' | Auto';
    const lang = languages[translation.from];

    languages = {
      ...languages,
      auto: {
        name: `${lang.name}${suffix}`,
        nativeName: `${lang.nativeName}${suffix}`
      }
    };
  }

  return (
    <Box className={styles.languageSelect}>
      <LanguageSelect value={from} onChange={setFrom} languages={languages} />
    </Box>
  );
};

export default FromLanguageSelect;
