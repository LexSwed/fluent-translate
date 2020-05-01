import React, { useEffect, useState } from 'react';
import { Card, Stack, Text } from '@fxtrot/edge';

import '../global.css';
import styles from './styles.css';

import { useText } from '../popup/store/utils';
import Close from './Close';
import FromLanguageSelect from '../popup/TextInput/FromLanguageSelect';
import TranslatedText from '../popup/Translated/TranslatedText';

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

  useEffect(() => {
    if (isMouseOver) {
      return;
    }

    const id = setTimeout(onClose, 4000);

    return () => {
      clearTimeout(id);
    };
  }, [isMouseOver, onClose]);

  return (
    <Card
      className={styles.app}
      onMouseOver={() => setMouseOver(true)}
      onMouseOut={() => setMouseOver(false)}
    >
      <Close onClick={() => onClose()} />
      <Stack>
        <Stack space="s">
          <FromLanguageSelect size="small" />
          <Text>{text}</Text>
        </Stack>
        <TranslatedText />
      </Stack>
    </Card>
  );
};

export default App;
