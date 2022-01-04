import { Icon, IconButton, styled } from '@fxtrot/ui';
import { XIcon } from '@heroicons/react/outline';

type Props = {
  onClick: () => void;
};

export const Close = ({ onClick }: Props) => {
  return (
    <CloseButton
      onClick={onClick}
      aria-label="Close popup"
      variant="flat"
      size="sm"
    >
      <Icon as={XIcon} />
    </CloseButton>
  );
};

export const CloseButton = styled(IconButton, {
  p: 0,
  opacity: 0,
});
