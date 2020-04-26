import React from 'react';
import { Box } from '@fxtrot/edge';

import TranslatorLink from '../TranslatorLink';

import styles from './styles.css';

const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <Box mb="s" className={styles.line} />
      <TranslatorLink className="link">Microsoft Translator</TranslatorLink>
    </div>
  );
};

export default Footer;
