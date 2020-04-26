import React from 'react';
import { Box, Icon } from '@fxtrot/edge';

import styles from './styles.css';

import { useTranslation } from '../AppContext';
import TranslatedText from './TranslatedText';

const Translated = () => {
  const translation = useTranslation();

  return translation.text ? (
    <TranslatedText />
  ) : (
    <Box className={styles.empty}>
      <Icon icon="language" size="xl" />
    </Box>
  );
};

export default Translated;
