import { Text, Icon, Flex, CssStyles, IconButton } from '@fxtrot/ui';
import { TranslateIcon, TrashIcon } from '@heroicons/react/outline';
import { memo } from 'react';
import { useLanguages } from '../atoms';

type Props = {
  item: MemoryItem;
  onSelect: (item: MemoryItem) => void;
  onDelete: (id: string) => any;
};

export const MemoryEntry = memo(({ item, onSelect, onDelete }: Props) => {
  return (
    <Flex flow="column" gap="1" role="listitem" css={styles.memoryEntry}>
      <Header item={item} onSelect={onSelect} onDelete={onDelete} />
      <Flex flow="column" gap="1">
        <Text size="sm">{item.text}</Text>
        <Text>{item.translation}</Text>
      </Flex>
    </Flex>
  );
});

const Header = ({ item, onSelect, onDelete }: Props) => {
  const languages = useLanguages();
  return (
    <Flex main="space-between" cross="center">
      <Text size="xs" css={styles.lightText}>
        {languages[item.from]}
        <span aria-label="translated to"> → </span>
        {languages[item.to]}
      </Text>
      <Flex gap="1">
        <IconButton
          label="Use translate"
          size="sm"
          variant="flat"
          onClick={() => {
            onSelect(item);
          }}
        >
          <Icon as={TranslateIcon} />
        </IconButton>
        <IconButton
          label="Delete item"
          size="sm"
          variant="flat"
          onClick={() => onDelete(item.id)}
        >
          <Icon as={TrashIcon} />
        </IconButton>
      </Flex>
    </Flex>
  );
};

const styles: Record<string, CssStyles> = {
  memoryEntry: {
    p: '$3',
    pt: '$2',
    borderBottom: '1px solid $borderLight',
    scrollSnapAlign: 'start',
  },
  lightText: {
    color: '$textSubtle',
  },
};
