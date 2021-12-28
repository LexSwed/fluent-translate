import React, { useState, useEffect, useCallback } from 'react';
import { Flex, styled } from '@fxtrot/ui';

import { Storage, deleteMemoryEntry } from '../../utils';
import MemoryEntry from './MemoryEntry';
import { useLanguages } from '../atoms';

const List = styled(Flex, {
  p: 0,
  listStyle: 'none',
  m: 0,
});

type Props = {};

export const Memory: React.FC<Props> = () => {
  const items = useMemory();
  const languages = useLanguages();

  const onDelete = useCallback(
    async (id: MemoryItem['id']) => deleteMemoryEntry(id),
    []
  );

  return (
    <List role="list" flow="column" cross="stretch">
      {items.map((item) => {
        return (
          <MemoryEntry
            key={item.id}
            item={{
              ...item,
              from: languages[item.from],
              to: languages[item.to],
            }}
            onDelete={onDelete}
          />
        );
      })}
    </List>
  );
};

let memorySaved: MemoryItems = [];
export function useMemory() {
  const [memory, setMemory] = useState<MemoryItems>(memorySaved);

  const setItems = useCallback(
    (items: MemoryItems) => {
      memorySaved = items;
      setMemory(items);
    },
    [setMemory]
  );

  useEffect(() => {
    Storage.getSyncItems<{ memory: MemoryItems }>('memory').then(
      ({ memory = [] }) => {
        setItems(memory);
      }
    );
  }, [setItems]);

  useEffect(() => {
    const onChange: onStorageChangeListener = ({ memory }, name) => {
      if (memory?.newValue && name === 'sync') {
        setItems(memory?.newValue as MemoryItems);
      }
    };

    chrome.storage.onChanged.addListener(onChange);

    return () => {
      chrome.storage.onChanged.removeListener(onChange);
    };
  }, [setItems]);

  return memory;
}

type onStorageChangeListener = Parameters<
  typeof chrome.storage.onChanged.addListener
>[0];
