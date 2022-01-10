import { Text, Icon, Flex, CssStyles, IconButton } from '@fxtrot/ui';
import { TranslateIcon, TrashIcon } from '@heroicons/react/outline';
import { memo } from 'react';
import { useLocale } from '../../translations';
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
  const t = useLocale();
  return (
    <Flex main="space-between" cross="center">
      <Text size="xs" css={styles.lightText}>
        {languages[item.from]}
        <span aria-label={t('popup.memory.translated-to')}> → </span>
        {languages[item.to]}
      </Text>
      <Flex gap="1">
        <IconButton
          label={t('popup.memory.use-translation')}
          size="sm"
          variant="flat"
          onClick={() => {
            onSelect(item);
          }}
        >
          <Icon as={TranslateIcon} />
        </IconButton>
        <IconButton
          label={t('popup.memory.delete-translation')}
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
