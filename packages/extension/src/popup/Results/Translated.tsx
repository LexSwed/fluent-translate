import { Text, Flex, Button, CssStyles, Popover } from '@fxtrot/ui';
import { TranslationSuccess } from '../../../../common/types';

import { useTranslation } from '../Translator';

export const Translated = () => {
  const { translation } = useTranslation();

  if (!translation) {
    return null;
  }

  const { pronunciation } = translation;
  return (
    <Flex flow="column" gap="1" cross="start">
      <ResultWithAlternatives {...translation} />
      {pronunciation && (
        <Text size="sm" css={pronunciationStyles}>
          {pronunciation}
        </Text>
      )}
    </Flex>
  );
};

const ResultWithAlternatives = ({ text, alternatives }: TranslationSuccess) => {
  if (!alternatives) {
    return <Text size="md">{text}</Text>;
  }
  return (
    <Popover>
      <Button
        aria-label="Alternative translations"
        size="sm"
        variant="flat"
        css={moreButton}
      >
        <Text size="md">{text}</Text>
      </Button>
      <Popover.Content side="top" css={popoverContent}>
        {alternatives.slice(1).map((alt) => (
          <Text as="div" size="md" key={alt}>
            {alt}
          </Text>
        ))}
      </Popover.Content>
    </Popover>
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
