import React from 'react';
import { Flex, Icon, styled } from '@fxtrot/ui';

import Translated from './Translated';
import { useTranslation } from '../store/utils';
import LanguageIcon from './LanguageIcon';

const Wrapper = styled(Flex, {
  userSelect: 'none',
  height: '$24',
  color: '$textLight',
});

const Result = () => {
  const translation = useTranslation();

  return translation.text ? (
    <Translated />
  ) : (
    <Wrapper main="center" cross="center">
      <Icon as={LanguageIcon} size="3xl" />
    </Wrapper>
  );
};

export default React.memo(Result);
