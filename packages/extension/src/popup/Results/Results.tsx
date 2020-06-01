import React from 'react';
import { Box } from '@fxtrot/edge';

import styles from './styles.css';

import Translated from './Translated';
import { useTranslation } from '../store/utils';
import LanguageIcon from './LanguageIcon';

const Result = () => {
  const translation = useTranslation();

  return translation.text ? (
    <Translated />
  ) : (
    <Box className={styles.empty}>
      <LanguageIcon fill="var(--gray-400" width={50} height={50} />
    </Box>
  );
};

export default React.memo(Result);
