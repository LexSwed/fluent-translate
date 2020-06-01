import React, { useEffect, useState } from 'react';
import { Stack, Text, Box } from '@fxtrot/edge';

import '../global.css';
import styles from './styles.css';

import { useText } from '../popup/store/utils';
import FromLanguageSelect from '../popup/TextInput/FromLanguageSelect';
import Translated from '../popup/Results/Translated';
import CloseTimer from './CloseTimer';

type Props = {
  text?: string;
  onClose: () => void;
};
const App: React.FC<Props> = ({ text, onClose }) => {
  const [, setText] = useText();
  const [isMouseOver, setMouseOver] = useState(false);

  useEffect(() => {
    text && setText(text);
  }, [text, setText]);

  return (
    <Box
      elevation="2"
      p="m"
      className={styles.app}
      onMouseOver={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      <CloseTimer isMouseOver={isMouseOver} onClose={onClose} />
      <Stack>
        <Stack space="s">
          <FromLanguageSelect size="small" />
          <Text>{text}</Text>
        </Stack>
        <Translated />
      </Stack>
    </Box>
  );
};

export default App;
