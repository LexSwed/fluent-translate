import React from 'react';
import { Flex, styled } from '@fxtrot/ui';

import { MemoryEntry } from './MemoryEntry';
import { useLanguages, useMemoryItems } from '../atoms';

const List = styled(Flex, {
  p: 0,
  listStyle: 'none',
  m: 0,
  minHeight: 400,
});

export const Memory = React.memo(() => {
  const [items, onDelete] = useMemoryItems();
  const languages = useLanguages();

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
});
