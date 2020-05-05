import React from 'react';
import { Box, Columns, Column } from '@fxtrot/edge';

import styles from './styles.css';

import TranslatorLink from '../TranslatorLink';
import HistoryHeading from '../History/HistoryHeading';

const Footer = () => {
  return (
    <Box px="m" py="s" className={styles.sheet}>
      <Columns align="apart" alignY="center">
        <Column width="content">
          <HistoryHeading />
        </Column>
        <Column width="content" className={styles.text}>
          <TranslatorLink>Microsoft Translator</TranslatorLink>
        </Column>
      </Columns>
    </Box>
  );
};

export default Footer;
