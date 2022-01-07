import React from 'react';
import { Box, CssStyles, Flex, styled, TextArea } from '@fxtrot/ui';

import { FromLanguageSelect } from '../LanguageSelect';
import { useInputText } from '../atoms';
import { Toolbar } from './Toolbar';

const StyledTextArea = styled(TextArea, {
  '&:placeholder-shown': {
    bc: '$surfaceHover',
  },
});

export const Input: React.FC = () => {
  const [text, setText] = useInputText();

  return (
    <Box css={wrapperStyles}>
      <Box p="$3" pb="$6">
        <Flex flow="column" gap="2">
          <Flex main="space-between" cross="center">
            <FromLanguageSelect />
            <Toolbar />
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
      </Box>
    </Box>
  );
};

const wrapperStyles: CssStyles = {
  '@light': {
    backdropFilter: 'brightness(0.995)',
  },
  '@dark': {
    backdropFilter: 'brightness(0.8)',
  },
};
