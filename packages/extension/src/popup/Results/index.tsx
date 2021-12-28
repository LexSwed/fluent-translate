import React from 'react';
import { Flex, Icon, styled } from '@fxtrot/ui';

import Translated from './Translated';
import LanguageIcon from './LanguageIcon';
import { useTranslation } from '../atoms';

const Wrapper = styled(Flex, {
  userSelect: 'none',
  height: '$24',
  color: '$textLight',
});

export const Result = React.memo(() => {
  const { translation } = useTranslation();

  return translation?.text ? (
    <Translated />
  ) : (
    <Wrapper flow="column" main="center" cross="center">
      <Icon as={LanguageIcon} size="3xl" />
    </Wrapper>
  );
});
