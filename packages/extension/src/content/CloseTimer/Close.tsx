import { Icon, IconButton, styled } from '@fxtrot/ui';
import { XIcon } from '@heroicons/react/outline';
import { useLocale } from '../../translations';

type Props = {
  onClick: () => void;
};

export const Close = ({ onClick }: Props) => {
  const t = useLocale();
  return (
    <CloseButton
      onClick={onClick}
      aria-label={t('content.popup-close-button')}
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
