import React, { useEffect, useState, useCallback } from 'react';
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
const App: React.FC<Props> = ({ to, text, onClose: onCloseProp }) => {
  const [, setTo] = useToLanguage();
  const [, setText] = useText();
  const [isMouseOver, setMouseOver] = useState(false);
  const [isMounted, setMounted] = useState(false);

  const onClose = useCallback(() => {
    setMounted(false);
    setTimeout(() => {
      onCloseProp();
    }, 300);
  }, [setMounted, onCloseProp]);

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
        <Stack space="s">
          <FromLanguageSelect size="small" border />
          <Text>{text}</Text>
        </Stack>
        <TranslatedText />
      </Stack>
    </Card>
  );
};

export default App;
