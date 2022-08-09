import React from 'react';
import { Text, CssStyles, Collapsible, styled, Column } from '@fxtrot/ui';
import type { TranslationSuccess } from '@fluent-translate/shared';
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
        <Column gap="6">
          {definitions.map((item, i) => (
            <DefinitionItem {...item} key={i} />
          ))}
        </Column>
      </Collapsible.Content>
    </Collapsible>
  );
};

const DefinitionItem = ({
  type,
  explanations,
}: NonNullable<TranslationSuccess['definitions']>[number]) => {
  return (
    <Column gap="2">
      <Text as="h1" css={definitionType}>
        {type}
      </Text>
      <Column gap="2" as="ol" css={definitionsList}>
        {explanations.map((exp, i) => (
          <DefinitionListItem key={i}>
            <Text textStyle="body-sm" as="div">
              {exp.explanation}
            </Text>
            {exp.example ? (
              <Text textStyle="body-sm" tone="light" as="i">
                {`"${exp.example}"`}
              </Text>
            ) : null}
          </DefinitionListItem>
        ))}
      </Column>
    </Column>
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
  bc: '$surface2',
  p: '$2',
  pb: '$4',
  mt: '$2',
  br: '$md',
};
const definitionType: CssStyles = {
  color: '$primary',
};
const definitionsList: CssStyles = {
  pl: '$4',
};
