import React, { useState, useEffect } from 'react';
import { Box } from '@fxtrot/edge';

import styles from './styles.css';
import { Storage } from '../../utils';
import { useLanguages, useStoreUpdater } from '../store/utils';
import HistoryEntry from './HistoryEntry';

type Props = {
  onClose: () => void;
};

const History: React.FC<Props> = ({ onClose }) => {
  const items = useHistory();
  const langs = useLanguages();
  const updateStore = useStoreUpdater();

  const onItemClick = (item: HistoryItem) => {
    updateStore(item);
    onClose();
  };

  return (
    <Box pr="m" className={styles.history}>
      <ul className={styles.list}>
        {items.map((item) => {
          return (
            <HistoryEntry
              key={item.text}
              item={{
                ...item,
                from: langs[item.from].name,
                to: langs[item.to].name,
              }}
              onClick={() => onItemClick(item)}
            />
          );
        })}
      </ul>
    </Box>
  );
};

export default History;

let historySaved: HistoryItems = [];
export function useHistory() {
  const [history, setHistory] = useState<HistoryItems>(historySaved);

  useEffect(() => {
    Storage.getSyncItems<{ history: HistoryItems }>('history').then(
      ({ history = [] }) => {
        historySaved = history;
        setHistory(history);
      }
    );
  }, [setHistory]);

  return history;
}
