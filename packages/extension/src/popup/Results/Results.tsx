import { memo } from 'react';
import { Flex, Box, CssStyles } from '@fxtrot/ui';

import { ToLanguageSelect } from '../LanguageSelect';
import { useTranslation } from '../Translator';
import { Skeleton } from './Skeleton';
import { Translated } from './Translated';
import { SwitchTranslations } from './SwitchTranslations';

export const Results = memo(() => {
  const { status } = useTranslation();

  if (status === 'initial') {
    return null;
  }

  return (
    <Box css={wrapperStyles}>
      <Box css={switchButton}>
        <SwitchTranslations />
      </Box>
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

const switchButton: CssStyles = {
  position: 'absolute',
  right: '$3',
  top: 0,
  transform: 'translateY(-50%)',
};
