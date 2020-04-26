import React, { useState, useRef, useLayoutEffect } from 'react';
import cx from 'classnames';
import autosize from 'autosize';
import { Box } from '@fxtrot/edge';

import LanguageSelect from '../LanguageSelect';

import styles from './styles.css';
import { useFromLanguage, useText } from '../AppContext';

const TextInput: React.FC = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [focused, setFocused] = useState(false);
  const [text, setText] = useText();
  const [from, setFrom] = useFromLanguage();

  const multiline = Math.floor(text.length / 25) > 0 || text.includes('\n');

  useLayoutEffect(() => {
    inputRef.current && autosize(inputRef.current);

    return () => {
      inputRef.current && autosize.destroy(inputRef.current);
    };
  }, [inputRef]);

  return (
    <Box
      className={cx(
        styles.wrapper,
        multiline && styles.multiline,
        focused && styles.inputFocused
      )}
    >
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={styles.input}
        autoFocus
        ref={inputRef}
      />
      <Box pl="xs" pr="xs" className={styles.languageSelect}>
        <LanguageSelect value={from} onChange={setFrom} />
      </Box>
    </Box>
  );
};

export default TextInput;
