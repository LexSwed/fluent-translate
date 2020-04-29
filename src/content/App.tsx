import React, { useEffect, useState } from 'react';
import { Card, Stack, Text } from '@fxtrot/edge';
import cx from 'classnames';

import '../global.css';
import styles from './styles.css';

import { useToLanguage, useText } from '../popup/store/utils';
import Close from './Close';
import FromLanguageSelect from '../popup/TextInput/FromLanguageSelect';
import TranslatedText from '../popup/Translated/TranslatedText';

type Props = {
  to?: string;
  text?: string;
  onClose: () => void;
};
const App: React.FC<Props> = ({ to, text, onClose }) => {
  const [, setTo] = useToLanguage();
  const [, setText] = useText();
  const [isMouseOver, setMouseOver] = useState(false);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    to && setTo(to);
    text && setText(text);
  }, [to, text, setTo, setText]);

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
      className={cx(styles.app, isMounted && styles.shown)}
      onMouseOver={() => setMouseOver(true)}
      onMouseOut={() => setMouseOver(false)}
    >
      <Close onClick={() => onClose()} />
      <Stack>
        <Stack space="xs">
          <FromLanguageSelect size="small" border />
          <Text className={styles.text}>{text}</Text>
        </Stack>
        <TranslatedText />
      </Stack>
    </Card>
  );
};

export default App;
