import { memo } from 'react';
import { Flex, Box, CssStyles } from '@fxtrot/ui';

import { TargetLanguageSelect } from '../LanguageSelect';
import { useTranslation } from '../Translator';
import { Skeleton } from './Skeleton';
import { Translated } from './Translated';
import { SwitchTranslations } from './SwitchTranslations';
import { RecentLanguages } from './RecentLanguages';

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
        <Flex flow="row" gap="4" cross="center">
          <TargetLanguageSelect />
          <RecentLanguages />
        </Flex>
        <Box pl="$2">{status === 'done' ? <Translated /> : <Skeleton />}</Box>
      </Flex>
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
