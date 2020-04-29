import React from 'react';
import { Box } from '@fxtrot/edge';

import styles from './styles.css';

import TranslatedText from './TranslatedText';
import { useTranslation } from '../store/utils';
import LanguageIcon from './LanguageIcon';

const Translated = () => {
  const translation = useTranslation();

  return translation.text ? (
    <TranslatedText />
  ) : (
    <Box className={styles.empty}>
      <LanguageIcon fill="var(--gray-400" width={50} height={50} />
    </Box>
  );
};

export default Translated;
