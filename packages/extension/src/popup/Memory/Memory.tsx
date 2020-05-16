import React, { useState, useEffect, useCallback } from 'react';
import { Box } from '@fxtrot/edge';

import styles from './styles.css';
import { Storage, deleteMemoryEntry } from '../../utils';
import { useLanguages } from '../store/utils';
import MemoryEntry from './MemoryEntry';

type Props = {};

const Memory: React.FC<Props> = () => {
  const [items, setItems] = useMemory();
  const langs = useLanguages();

  const onDelete = useCallback(
    async (id: MemoryItem['id']) => {
      const memory = await deleteMemoryEntry(id);

      setItems(memory);
    },
    [setItems]
  );
  console.log('render', items);
  return (
    <Box pr="m" className={styles.memory}>
      <ul className={styles.list}>
        {items.map((item) => {
          return (
            <MemoryEntry
              key={item.id}
              item={{
                ...item,
                from: langs[item.from].name,
                to: langs[item.to].name,
              }}
              onDelete={onDelete}
            />
          );
        })}
      </ul>
    </Box>
  );
};

export default Memory;

let memorySaved: MemoryItems = [];
export function useMemory() {
  const [memory, setMemory] = useState<MemoryItems>(memorySaved);

  useEffect(() => {
    Storage.getSyncItems<{ memory: MemoryItems }>('memory').then(
      ({ memory = [] }) => {
        memorySaved = memory;
        setMemory(memory);
      }
    );
  }, [setMemory]);

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

  const setItems = useCallback(
    (items: MemoryItems) => {
      memorySaved = items;
      setMemory(items);
    },
    [setMemory]
  );

  return [memory, setItems] as const;
}

type onStorageChangeListener = Parameters<
  typeof chrome.storage.onChanged.addListener
>[0];
