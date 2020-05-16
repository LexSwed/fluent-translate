import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { Box, Columns, Column } from '@fxtrot/edge';

import styles from './styles.css';

import MemoryHeading from '../Memory/MemoryHeading';
import Memory from '../Memory';
import { useMemory } from '../Memory/Memory';

const Footer = () => {
  const [isOpen, setOpen] = useState(false);
  const isMemory = useMemoryItemsNotEmpty();

  useEffect(() => {
    if (isMemory) {
      setOpen(false);
    }
  }, [isMemory]);

  return (
    <div className={cx(styles.footer, isOpen && styles.footerOpen)}>
      <Box
        px="m"
        py="s"
        className={cx(styles.footerBar, isOpen && styles.footerBarOpen)}
      >
        <Columns align="right" alignY="center">
          {isMemory ? (
            <Column width="content">
              <MemoryHeading isOpen={isOpen} onClick={() => setOpen(!isOpen)} />
            </Column>
          ) : null}
        </Columns>
      </Box>
      {isOpen && <Memory />}
    </div>
  );
};

export default Footer;

function useMemoryItemsNotEmpty(): boolean {
  const [memory, setMemory] = useMemory();

  useEffect(() => {
    const onChange: onStorageChangeListener = ({ memory }, name) => {
      if (memory?.newValue && name === 'sync') {
        setMemory(memory?.newValue as MemoryItems);
      }
    };

    chrome.storage.onChanged.addListener(onChange);

    return () => {
      chrome.storage.onChanged.removeListener(onChange);
    };
  }, [setMemory]);

  return memory.length > 0;
}

type onStorageChangeListener = Parameters<
  typeof chrome.storage.onChanged.addListener
>[0];
