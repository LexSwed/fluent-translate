import React, { useState } from 'react';

import { Text, Button, Icon, Flex, styled } from '@fxtrot/ui';
import { TrashIcon } from '@heroicons/react/outline';

const Header: React.FC<Props> = ({ item, onDelete }) => {
  return (
    <Flex flow="row" main="space-between" cross="center">
      <Text size="xs" css={{ color: '$textDisabled' }}>
        {item.from}
        <span aria-label="translated to"> → </span>
        {item.to}
      </Text>
      <Button size="sm" variant="flat" onClick={() => onDelete(item.id)}>
        <Icon as={TrashIcon} />
      </Button>
    </Flex>
  );
};

const Texts: React.FC<Omit<Props, 'onDelete'>> = ({ item }) => {
  const [isShown, setShown] = useState(false);

  return (
    <Flex gap="sm">
      <Text>{item.text}</Text>
      {isShown ? (
        <Text>{item.translation}</Text>
      ) : (
        <Button size="sm" onClick={() => setShown(true)} variant="link">
          Show translation
        </Button>
      )}
    </Flex>
  );
};

type Props = {
  item: MemoryItem;
  onDelete: (id: string) => any;
};

const Entry = styled(Flex, {
  p: '$3',
  py: '$2',
  borderBottom: '1px solid $borderLight',
});

const MemoryEntry: React.FC<Props> = ({ item, onDelete }) => {
  return (
    <Entry as="li" gap="sm">
      <Header item={item} onDelete={onDelete} />
      <Texts item={item} />
    </Entry>
  );
};

export default MemoryEntry;
