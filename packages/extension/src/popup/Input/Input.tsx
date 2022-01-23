import React from 'react';
import { Box, Column, CssStyles, Row, styled, TextArea } from '@fxtrot/ui';

import { SourceLanguageSelect } from '../LanguageSelect';
import { useInputText } from '../atoms';
import { Toolbar } from './Toolbar';
import { useLocale } from '../../translations';
import { isNextEnv } from '../../isNextEnv';

const StyledTextArea = styled(TextArea, {
  textarea: {
    color: '$text',
  },
});

export const Input: React.FC = () => {
  const [text, setText] = useInputText();
  const t = useLocale();

  return (
    <Box css={wrapperStyles}>
      <Box p="$3" pb="$6">
        <Column gap="2">
          <Row main="space-between" cross="center">
            <SourceLanguageSelect />
            <Toolbar />
          </Row>
          <StyledTextArea
            aria-label={t('popup.input-text-label')}
            value={text}
            onChange={setText}
            autoFocus={!isNextEnv}
            rows={2}
            size="md"
          />
        </Column>
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
