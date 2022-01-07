import { memo } from 'react';
import { Flex, Box, CssStyles } from '@fxtrot/ui';

import { ToLanguageSelect } from '../LanguageSelect';
import { useTranslationStatus } from '../atoms';
import { Skeleton } from './Skeleton';
import { Translated } from './Translated';

export const Results = memo(() => {
  const status = useTranslationStatus();

  if (status === 'initial') {
    return null;
  }

  return (
    <Box css={wrapperStyles}>
      <Flex flow="column" gap="2" cross="stretch">
        <ToLanguageSelect />
        <Box pl="$2">{status === 'done' ? <Translated /> : <Skeleton />}</Box>
      </Flex>
    </Box>
  );
});

const wrapperStyles: CssStyles = {
  p: '$3',
  pb: '$6',
  borderTop: '1px solid $flatHover',
  position: 'relative',
};
