import React, { useState, useEffect } from 'react';
import { Storage } from '../../utils';

const History = () => {
  const items = useHistory();
  console.log(items);
  return <div></div>;
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
