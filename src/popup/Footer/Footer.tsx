import React from 'react';
import { Inline } from '@fxtrot/edge';

import TranslatorLink from '../TranslatorLink';

import styles from './styles.css';

const Footer = () => {
  return (
    <Inline space="m" align="center" alignY="center">
      <TranslatorLink className={styles.text}>
        Microsoft Translator
      </TranslatorLink>
    </Inline>
  );
};

export default Footer;
