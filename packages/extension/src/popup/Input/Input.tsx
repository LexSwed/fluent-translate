import React from 'react';
import { Flex, styled, TextArea } from '@fxtrot/ui';

import { FromLanguageSelect } from '../LanguageSelect';
import { useInputText } from '../atoms';

const StyledTextArea = styled(TextArea, {
  '&:placeholder-shown': {
    bc: '$surfaceHover',
  },
});

export const Input: React.FC = () => {
  const [text, setText] = useInputText();

  return (
    <Wrapper>
      <Flex flow="column" gap="2">
        <Flex main="space-between" cross="baseline">
          <FromLanguageSelect />
        </Flex>
        <StyledTextArea
          aria-label="Text to translate"
          value={text}
          onChange={setText}
          autoFocus
          rows={2}
          size="md"
        />
      </Flex>
    </Wrapper>
  );
};

const Wrapper = styled('div', {
  borderBottom: '1px solid $borderStill',
  backdropFilter: 'brightness(0.8)',
  mb: -1,
  p: '$3',
  pb: '$6',
});
