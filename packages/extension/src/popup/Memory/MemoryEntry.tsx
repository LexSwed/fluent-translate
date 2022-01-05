import { Text, Button, Icon, Flex, CssStyles } from '@fxtrot/ui';
import { TrashIcon } from '@heroicons/react/outline';

type Props = {
  item: MemoryItem;
  onDelete: (id: string) => any;
};

const styles: Record<string, CssStyles> = {
  memoryEntry: {
    p: '$3',
    py: '$2',
    borderBottom: '1px solid $borderLight',
    scrollSnapAlign: 'start',
  },
  lightText: {
    color: '$textSubtle',
  },
};
export const MemoryEntry: React.FC<Props> = ({ item, onDelete }) => {
  return (
    <Flex flow="column" gap="1" role="listitem" css={styles.memoryEntry}>
      <Header item={item} onDelete={onDelete} />
      <Flex flow="column" gap="1">
        <Text size="sm">{item.text}</Text>
        <Text>{item.translation}</Text>
      </Flex>
    </Flex>
  );
};

const Header: React.FC<Props> = ({ item, onDelete }) => {
  return (
    <Flex main="space-between" cross="center">
      <Text size="xs" css={styles.lightText}>
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
