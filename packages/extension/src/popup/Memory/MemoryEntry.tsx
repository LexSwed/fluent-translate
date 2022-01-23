import React from 'react';
import { Text, Icon, CssStyles, IconButton, Column, Row } from '@fxtrot/ui';
import { TranslateIcon, TrashIcon } from '@heroicons/react/outline';
import { useLocale } from '../../translations';
import { useLanguages } from '../atoms';

type Props = {
  item: MemoryItem;
  onSelect: (item: MemoryItem) => void;
  onDelete: (id: string) => any;
};

export const MemoryEntry = React.memo(({ item, onSelect, onDelete }: Props) => {
  return (
    <Column gap="1" role="listitem" css={styles.memoryEntry}>
      <Header item={item} onSelect={onSelect} onDelete={onDelete} />
      <Column gap="1">
        <Text size="sm">{item.text}</Text>
        <Text>{item.translation}</Text>
      </Column>
    </Column>
  );
});

const Header = ({ item, onSelect, onDelete }: Props) => {
  const languages = useLanguages();
  const t = useLocale();
  return (
    <Row main="space-between" cross="center">
      <Text size="xs" css={styles.lightText}>
        {languages[item.from]}
        <span aria-label={t('popup.memory.translated-to')}> → </span>
        {languages[item.to]}
      </Text>
      <Row gap="1">
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
      </Row>
    </Row>
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
