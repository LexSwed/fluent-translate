import React from 'react';

import styles from './styles.css';
import { Box, Columns, Column, Stack, Text } from '@fxtrot/edge';

type Props = {
  item: HistoryItem;
  onClick: () => void;
};

const HistoryEntry: React.FC<Props> = ({
  item: { text, to, from, translation },
  onClick
}) => {
  return (
    <li className={styles.entry} onClick={onClick}>
      <Box p="s">
        <Columns>
          <Column>
            <Stack space="s">
              <Text tone="light" className={styles.languages}>
                {from}
                <span aria-label="arrow right"> → </span>
                {to}
              </Text>
              <Stack space="xs">
                <Text>{text}</Text>
                <Text tone="light">{translation}</Text>
              </Stack>
            </Stack>
          </Column>
          <Column width="content"></Column>
        </Columns>
      </Box>
    </li>
  );
};

export default HistoryEntry;
