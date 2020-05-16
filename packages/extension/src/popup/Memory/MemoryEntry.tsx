import React from 'react';

import styles from './styles.css';
import { Box, Columns, Column, Stack, Text, Button, Icon } from '@fxtrot/edge';

const Header: React.FC<Props> = ({ item, onDelete }) => {
  return (
    <Columns align="apart">
      <Column width="content">
        <Text tone="light" className={styles.languages}>
          {item.from}
          <span aria-label="arrow right"> → </span>
          {item.to}
        </Text>
      </Column>
      <Column width="content">
        <Button size="xs" tone="transparent" onClick={() => onDelete(item.id)}>
          <Icon icon="delete" />
        </Button>
      </Column>
    </Columns>
  );
};

type Props = {
  item: MemoryItem;
  onDelete: (id: string) => any;
};

const MemoryEntry: React.FC<Props> = ({ item, onDelete }) => {
  return (
    <li className={styles.entry}>
      <Box p="s">
        <Columns>
          <Column>
            <Stack space="s">
              <Header item={item} onDelete={onDelete} />
              <Stack space="xs">
                <Text>{item.text}</Text>
                <Text tone="light">{item.translation}</Text>
              </Stack>
            </Stack>
          </Column>
          <Column width="content"></Column>
        </Columns>
      </Box>
    </li>
  );
};

export default MemoryEntry;
