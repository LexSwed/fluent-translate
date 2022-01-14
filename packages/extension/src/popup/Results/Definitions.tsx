import { Text, Flex, CssStyles, Collapsible, styled } from '@fxtrot/ui';
import type { TranslationSuccess } from '@shared/types';
import { useLocale } from '../../translations';

export const Definitions = ({
  definitions,
}: {
  definitions: NonNullable<TranslationSuccess['definitions']>;
}) => {
  const t = useLocale();
  return (
    <Collapsible css={collapsibleRoot}>
      <Collapsible.Trigger size="sm">
        {t('popup.definitions.label')}
      </Collapsible.Trigger>
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
            <Text size="sm" as="div">
              {exp.explanation}
            </Text>
            {exp.example ? (
              <Text size="sm" tone="light" as="i">
                {`"${exp.example}"`}
              </Text>
            ) : null}
          </DefinitionListItem>
        ))}
      </Flex>
    </Flex>
  );
};

const DefinitionListItem = styled('li', {
  'listStyle': 'auto',
  '&::marker': {
    textSize: '$sm',
  },
});

const collapsibleRoot: CssStyles = {
  ml: '-$2',
};
const definitionsContent: CssStyles = {
  bc: '$flatActive',
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
