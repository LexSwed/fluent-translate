import React, { useState } from 'react';
import cx from 'classnames';
import { Box, Columns, Column } from '@fxtrot/edge';

import styles from './styles.css';

import TranslatorLink from '../TranslatorLink';
import HistoryHeading from '../History/HistoryHeading';
import History from '../History';

const Footer = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={cx(styles.footer, isOpen && styles.footerOpen)}>
      <Box px="m" py="s">
        <Columns align="apart" alignY="center">
          <Column width="content">
            <HistoryHeading onClick={() => setOpen(!isOpen)} />
          </Column>
          <Column width="content" className={styles.text}>
            <TranslatorLink>Microsoft Translator</TranslatorLink>
          </Column>
        </Columns>
      </Box>
      {isOpen && <History />}
    </div>
  );
};

export default Footer;
