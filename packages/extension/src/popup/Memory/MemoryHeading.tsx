import React from 'react';
import { Button, Icon } from '@fxtrot/edge';

type Props = {
  isOpen: boolean;
  onClick: React.ComponentProps<typeof Button>['onClick'];
};

const MemoryHeading: React.FC<Props> = ({ isOpen, onClick }) => {
  return (
    <Button tone="transparent" size="xs" onClick={onClick}>
      <Icon icon="history" />
      {isOpen ? 'Close' : 'Memory'}
    </Button>
  );
};

export default MemoryHeading;
