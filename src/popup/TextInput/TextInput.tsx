import React, { useState, useRef, useLayoutEffect } from 'react';
import cx from 'classnames';
import autosize from 'autosize';
import { Box } from '@fxtrot/edge';

import styles from './styles.css';

import { useText } from '../store/utils';
import FromLanguageSelect from './FromLanguageSelect';

const TextInput: React.FC = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [focused, setFocused] = useState(false);
  const [text, setText] = useText();

  const multiline = Math.floor(text.length / 25) > 0 || text.includes('\n');

  useLayoutEffect(() => {
    const el = inputRef.current;

    el && autosize(el);

    return () => {
      el && autosize.destroy(el);
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
      <FromLanguageSelect />
    </Box>
  );
};

export default TextInput;
