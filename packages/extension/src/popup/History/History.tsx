import React, { useState, useEffect } from 'react';
import { Box, Stack, Text, Columns, Column } from '@fxtrot/edge';

import styles from './styles.css';
import { Storage } from '../../utils';
import { useLanguages } from '../store/utils';

const History = () => {
  const items = useHistory();
  const langs = useLanguages();

  return (
    <Box pr="s" className={styles.history}>
      <ul className={styles.list}>
        {items.map((item) => {
          return (
            <li className={styles.entry} key={item.text}>
              <Box p="s">
                <Columns>
                  <Column>
                    <Stack space="s">
                      <Text tone="light" className={styles.languages}>
                        {langs[item.from].nativeName}
                        <span aria-label="arrow right"> → </span>
                        {langs[item.to].nativeName}
                      </Text>
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
        })}
      </ul>
    </Box>
  );
};

export default History;

let historySaved: HistoryItems = [];
function useHistory() {
  const [history, setHistory] = useState<HistoryItems>(historySaved);

  useEffect(() => {
    Storage.getSyncItems<{ history: HistoryItems }>('history').then(
      ({ history }) => {
        historySaved = history;
        setHistory(history);
      }
    );
  }, [setHistory]);

  return history;
}
