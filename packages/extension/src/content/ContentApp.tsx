import { useEffect, useState } from 'react';
import { styled, Flex, Text, Box } from '@fxtrot/ui';

import { Translated } from '../popup/Results/Translated';
import { CloseTimer } from './CloseTimer';
import { FromLanguageSelect } from '../popup/LanguageSelect';
import { useInputText, useTranslation } from '../popup/atoms';

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
  boxShadow: '$popper',
  color: '$text',
});

const ContentApp: React.FC<Props> = ({ text, onClose }) => {
  const [, setText] = useInputText();
  const [isMouseOver, setMouseOver] = useState(false);
  const { translation } = useTranslation();

  useEffect(() => {
    text && setText(text);
  }, [text, setText]);

  return (
    <Main
      onMouseOver={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      {translation?.text ? (
        <CloseTimer isMouseOver={isMouseOver} onClose={onClose} key={text} />
      ) : null}
      <Flex flow="column" gap="md">
        <Flex flow="column" gap="sm">
          <FromLanguageSelect />
          <Box pl="$2">
            <Text>{text}</Text>
          </Box>
        </Flex>
        <Translated />
      </Flex>
    </Main>
  );
};

export default ContentApp;
