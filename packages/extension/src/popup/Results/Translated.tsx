import React from 'react';
import { Text, Button, CssStyles, Popover, Column } from '@fxtrot/ui';
import type { TranslationSuccess } from '@fluent-translate/shared';
import { useLocale } from '../../translations';

import { useTranslation } from '../Translator';
import { Definitions } from './Definitions';

export const Translated = () => {
  const { translation } = useTranslation();

  if (!translation) {
    return null;
  }

  const { pronunciation, definitions } = translation;

  return (
    <Column gap="4">
      <Column gap="1" cross="start">
        <ResultWithAlternatives {...translation} />
        {pronunciation && (
          <Text textStyle="body-sm" tone="light">
            {pronunciation}
          </Text>
        )}
      </Column>
      {definitions ? <Definitions definitions={definitions} /> : null}
    </Column>
  );
};

const ResultWithAlternatives = ({ text, alternatives }: TranslationSuccess) => {
  const t = useLocale();
  if (!alternatives) {
    return <Text textStyle="body-md">{text}</Text>;
  }
  return (
    <Popover>
      <Button
        aria-label={t('popup.translation.alternatives')}
        size="sm"
        variant="flat"
        css={moreButton}
      >
        <Text textStyle="body-md">{text}</Text>
      </Button>
      <Popover.Content side="top" css={popoverContent}>
        {alternatives.slice(1).map((alt) => (
          <Text as="div" textStyle="body-sm" key={alt}>
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
