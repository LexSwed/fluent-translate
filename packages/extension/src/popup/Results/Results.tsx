import React from 'react';
import { Row, Box, CssStyles, Column } from '@fxtrot/ui';

import { TargetLanguageSelect } from '../LanguageSelect';
import { useTranslation } from '../Translator';
import { Skeleton } from './Skeleton';
import { Translated } from './Translated';
import { SwitchTranslations } from './SwitchTranslations';
import { RecentLanguages } from './RecentLanguages';

export const Results = React.memo(() => {
  const { status } = useTranslation();

  if (status === 'initial') {
    return null;
  }

  return (
    <Box css={wrapperStyles}>
      <Box css={switchButton}>
        <SwitchTranslations />
      </Box>
      <Column gap="2" cross="stretch">
        <Row gap="4" cross="center">
          <TargetLanguageSelect />
          <RecentLanguages />
        </Row>
        <Box pl="$2">{status === 'done' ? <Translated /> : <Skeleton />}</Box>
      </Column>
    </Box>
  );
});

const wrapperStyles: CssStyles = {
  p: '$3',
  pb: '$4',
  borderTop: '1px solid $flatHover',
  position: 'relative',
};

const switchButton: CssStyles = {
  position: 'absolute',
  right: '$3',
  top: 0,
  transform: 'translateY(-50%)',
};
