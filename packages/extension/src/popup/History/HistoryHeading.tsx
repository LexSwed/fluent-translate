import React from 'react';
import { Button } from '@fxtrot/edge';

import styles from './styles.css';

const Icon = (
  <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24">
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      fill="var(--text-color)"
      d="M13 3c-5 0-9 4-9 9H1l3.9 3.9v.1L9 12H6a7 7 0 112 5l-1.4 1.4A9 9 0 1013 3zm-1 5v5l4.3 2.5.7-1.2-3.5-2V8H12z"
    />
  </svg>
);

type Props = {
  onClick: React.ComponentProps<typeof Button>['onClick'];
};

const HistoryHeading: React.FC<Props> = ({ onClick }) => {
  return (
    <Button
      tone="transparent"
      size="xs"
      onClick={onClick}
      className={styles.historyHeading}
    >
      {Icon}
      History
    </Button>
  );
};

export default HistoryHeading;
