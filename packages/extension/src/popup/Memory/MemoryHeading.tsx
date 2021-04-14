import React from 'react';
import { Button, Icon, Text } from '@fxtrot/ui';
import { BookmarkAltIcon } from '@heroicons/react/outline';

type Props = {
  isOpen: boolean;
  onClick: React.ComponentProps<typeof Button>['onClick'];
};

const MemoryHeading: React.FC<Props> = ({ isOpen, onClick }) => {
  return (
    <Button variant="flat" onClick={onClick} size="xs">
      <Icon as={BookmarkAltIcon} />
      <Text size="sm">{isOpen ? 'Close' : 'Memory'}</Text>
    </Button>
  );
};

export default MemoryHeading;
