import React, { useState, useEffect } from 'react';
import { Box, Columns, Column } from '@fxtrot/edge';

import styles from './styles.css';

import TranslatorLink from '../TranslatorLink';
import HistoryHeading from '../History/HistoryHeading';

const Footer = () => {
  const [isOpen, setOpen] = useState(false);
  const [style, setStyle] = useState<React.CSSProperties>(calcStyle());

  useEffect(() => {
    if (isOpen) {
      setStyle(calcStyle());
    } else {
      setStyle({ transform: 'none' });
    }
  }, [isOpen]);

  return (
    <div className={styles.footer} style={style}>
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
      {isOpen && (
        <Box p="m">
          <Box p="m">Huge content!</Box>
          <Box p="m">Huge content!</Box>
          <Box p="m">Huge content!</Box>
        </Box>
      )}
    </div>
  );
};

export default Footer;

function calcStyle() {
  const { height } = document.body.getBoundingClientRect();

  return {
    transform: `translateY(calc((${height}px - 100%) * -1))`
  };
}
