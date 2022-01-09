import {
  Text,
  Flex,
  Button,
  CssStyles,
  Popover,
  Collapsible,
  styled,
} from '@fxtrot/ui';
import { TranslationSuccess } from '../../../../common/types';

import { useTranslation } from '../Translator';

export const Translated = () => {
  const { translation } = useTranslation();

  if (!translation) {
    return null;
  }

  const { pronunciation, definitions } = translation;

  return (
    <Flex flow="column" gap="4">
      <Flex flow="column" gap="1" cross="start">
        <ResultWithAlternatives {...translation} />
        {pronunciation && (
          <Text size="sm" css={pronunciationStyles}>
            {pronunciation}
          </Text>
        )}
      </Flex>
      {definitions ? <Definitions definitions={definitions} /> : null}
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

const Definitions = ({
  definitions,
}: {
  definitions: NonNullable<TranslationSuccess['definitions']>;
}) => {
  return (
    <Collapsible css={collapsibleRoot}>
      <Collapsible.Trigger size="sm">Definitions</Collapsible.Trigger>
      <Collapsible.Content css={definitionsContent}>
        <Flex flow="column" gap="6">
          {definitions.map((item, i) => (
            <DefinitionItem {...item} key={i} />
          ))}
        </Flex>
      </Collapsible.Content>
    </Collapsible>
  );
};

const DefinitionItem = ({
  type,
  explanations,
}: NonNullable<TranslationSuccess['definitions']>[number]) => {
  return (
    <Flex flow="column" gap="2">
      <Text as="h1" css={definitionType}>
        {type}
      </Text>
      <Flex flow="column" gap="2" as="ol" css={definitionsList}>
        {explanations.map((exp, i) => (
          <DefinitionListItem key={i}>
            <Text as="div">{exp.explanation}</Text>
            {exp.example ? (
              <Text tone="light" as="div">
                {`"${exp.example}"`}
              </Text>
            ) : null}
          </DefinitionListItem>
        ))}
      </Flex>
    </Flex>
  );
};

const collapsibleRoot: CssStyles = {
  ml: '-$2',
};
const definitionsContent: CssStyles = {
  bc: '$surfaceHover',
  p: '$2',
  pb: '$4',
  mt: '$2',
  br: '$md',
};
const definitionType: CssStyles = {
  color: '$primaryStill',
};
const definitionsList: CssStyles = {
  pl: '$4',
};
const DefinitionListItem = styled('li', {
  'listStyle': 'auto',
  '&::marker': {
    textSize: '$sm',
  },
});
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
