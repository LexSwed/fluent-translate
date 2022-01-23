import React, { useEffect, useState } from 'react';
import { styled, Column, Text, Box } from '@fxtrot/ui';

import { CloseTimer } from './CloseTimer';
import { SourceLanguageSelect } from '../popup/LanguageSelect';
import { useInputText } from '../popup/atoms';
import { useTranslation } from '../popup/Translator';
import { Results } from '../popup/Results';

type Props = {
  text?: string;
  onClose: () => void;
};

const Main = styled(Box, {
  bc: '$surfaceStill',
  position: 'relative',
  width: '300px',
  maxHeight: '400px',
  overflow: 'auto',
  br: '$md',
  transition: '0.2s',
  boxShadow: '$popper',
  color: '$text',
});

const ContentApp: React.FC<Props> = ({ text, onClose }) => {
  const [inputText, setText] = useInputText();
  const [isMouseOver, setMouseOver] = useState(false);
  const { status } = useTranslation();

  useEffect(() => {
    text && setText(text);
  }, [text, setText]);

  return (
    <Main
      onMouseOver={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      {status === 'done' ? (
        <CloseTimer isMouseOver={isMouseOver} onClose={onClose} key={text} />
      ) : null}
      <Column gap="md">
        <Box p="$3">
          <Column gap="sm">
            <SourceLanguageSelect />
            <Box pl="$2">
              <Text>{inputText}</Text>
            </Box>
          </Column>
        </Box>
        <Results />
      </Column>
    </Main>
  );
};

export default ContentApp;
