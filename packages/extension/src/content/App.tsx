import React, { useEffect, useState } from 'react';
import { styled, Flex, Text, Box } from '@fxtrot/ui';

import { useText } from '../popup/store/utils';
import FromLanguageSelect from '../popup/TextInput/FromLanguageSelect';
import Translated from '../popup/Results/Translated';
import CloseTimer from './CloseTimer';

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
  p: '$4',
  transition: '0.2s',
  boxShadow: '$xl',
  color: '$text',
});

const App: React.FC<Props> = ({ text, onClose }) => {
  const [, setText] = useText();
  const [isMouseOver, setMouseOver] = useState(false);

  useEffect(() => {
    text && setText(text);
  }, [text, setText]);

  return (
    <Main
      onMouseOver={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      <CloseTimer isMouseOver={isMouseOver} onClose={onClose} />
      <Flex gap="md">
        <Flex gap="sm">
          <FromLanguageSelect />
          <Text size="md">{text}</Text>
        </Flex>
        <Translated />
      </Flex>
    </Main>
  );
};

export default App;
