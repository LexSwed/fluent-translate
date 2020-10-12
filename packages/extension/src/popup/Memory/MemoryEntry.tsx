import React, { useState } from 'react';

import { Text, Button, Icon, TextLink, Flex, styled } from '@fxtrot/ui';
import { HiOutlineTrash } from 'react-icons/hi';

const Header: React.FC<Props> = ({ item, onDelete }) => {
  return (
    <Flex flow="row" main="spread" cross="center">
      <Text size="xs" css={{ color: '$textDisabled' }}>
        {item.from}
        <span aria-label="translated to"> → </span>
        {item.to}
      </Text>
      <Button size="sm" variant="flat" onPress={() => onDelete(item.id)}>
        <Icon as={HiOutlineTrash} />
      </Button>
    </Flex>
  );
};

const Texts: React.FC<Omit<Props, 'onDelete'>> = ({ item }) => {
  const [isShown, setShown] = useState(false);

  return (
    <Flex space="xs">
      <Text size="sm">{item.text}</Text>
      {isShown ? (
        <Text size="sm">{item.translation}</Text>
      ) : (
        <TextLink href="#" size="sm" onPress={() => setShown(true)}>
          Show translation
        </TextLink>
      )}
    </Flex>
  );
};

type Props = {
  item: MemoryItem;
  onDelete: (id: string) => any;
};

const Entry = styled(Flex, {
  p: '$2',
  pr: '$3',
  borderBottom: '1px solid $surfaceActive',
});

const MemoryEntry: React.FC<Props> = ({ item, onDelete }) => {
  return (
    <Entry as="li" space="sm" cross="stretch">
      <Header item={item} onDelete={onDelete} />
      <Texts item={item} />
    </Entry>
  );
};

export default MemoryEntry;
