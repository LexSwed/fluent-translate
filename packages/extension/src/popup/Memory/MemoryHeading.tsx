import React from 'react';
import { Button, Icon } from '@fxtrot/ui';
import { HiOutlineBookmarkAlt } from 'react-icons/hi';

type Props = {
  isOpen: boolean;
  onPress: React.ComponentProps<typeof Button>['onPress'];
};

const MemoryHeading: React.FC<Props> = ({ isOpen, onPress }) => {
  return (
    <Button variant="flat" onPress={onPress} size="sm">
      <Icon as={HiOutlineBookmarkAlt} />
      {isOpen ? 'Close' : 'Memory'}
    </Button>
  );
};

export default MemoryHeading;
