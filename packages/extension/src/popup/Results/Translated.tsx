import { Text, Flex, Button, CssStyles, Popover } from '@fxtrot/ui';

import { useTranslation } from '../atoms';

export const Translated = () => {
  const { translation } = useTranslation();

  if (!translation) {
    return null;
  }

  const { text, pronunciation, alternatives } = translation;
  return (
    <Flex flow="column" gap="1" cross="start">
      {alternatives ? (
        <Popover>
          <Button
            aria-label="Alternative translations"
            size="sm"
            variant="flat"
            css={moreButton}
          >
            {text}
          </Button>
          <Popover.Content side="top" css={popoverContent}>
            <Text as="div" size="sm">
              {alternatives.join(', ')}
            </Text>
          </Popover.Content>
        </Popover>
      ) : (
        <Text size="md">{text}</Text>
      )}

      {pronunciation && (
        <Text size="sm" css={pronunciationStyles}>
          {pronunciation}
        </Text>
      )}
    </Flex>
  );
};

const popoverContent: CssStyles = {
  p: '$2',
  maxWidth: '85vw',
  maxHeight: '160px',
  overflowY: 'auto',
};
const moreButton: CssStyles = {
  ml: '-$2',
  whiteSpace: 'break-spaces',
  py: '$1',
  height: 'auto',
  textSize: '$md',
  textAlign: 'start',
};
const pronunciationStyles: CssStyles = { color: '$textSubtle' };
