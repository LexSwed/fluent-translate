import React, { useState, useRef, useLayoutEffect } from 'react';
import autosize from 'autosize';
import { styled, Box, Flex } from '@fxtrot/ui';

import { useText } from '../store/utils';
import FromLanguageSelect from './FromLanguageSelect';

const TextArea = styled('textarea', {
  display: 'block',
  outline: 'none',
  border: 'none',
  resize: 'none',
  fontFamily: 'inherit',
  minHeight: '1em',
  maxHeight: '150px',
  width: 'calc(100% - 8px * 2)',
  overflow: 'hidden',
  fontSize: '$sm',
  height: '$3',
  p: '$2',
  m: 0,
  br: '$md',
  bc: 'transparent',
  color: '$text',
});
const SelectWrapper = styled(Box, {
  pr: '$1',
});

const Wrapper = styled(Flex, {
  border: '1px solid $borderStill',
  br: '$md',
  display: 'flex',
  alignItems: 'center',
  transition: '0.12s ease-in-out',

  variants: {
    focused: {
      true: {
        borderColor: '$borderActive',
      },
      false: {
        'borderColor': '$borderStill',
        ':hover': { borderColor: '$borderHover' },
      },
    },
    multiline: {
      true: {
        [`> ${SelectWrapper}`]: {
          alignSelf: 'flex-end',
          pb: '$1',
        },
      },
    },
  },
});

const TextInput: React.FC = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [focused, setFocused] = useState(false);
  const [text, setText] = useText();

  const multiline = Math.floor(text.length / 25) > 0 || text.includes('\n');

  useLayoutEffect(() => {
    const el = inputRef.current;

    if (el) {
      autosize(el);
      el.focus();
    }

    return () => {
      el && autosize.destroy(el);
    };
  }, [inputRef]);

  return (
    <Wrapper
      flow={multiline ? 'column' : 'row'}
      focused={focused}
      multiline={multiline}
      main="stretch"
      cross="stretch"
    >
      <TextArea
        value={text}
        onChange={(e: any) => setText(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoFocus
        ref={inputRef}
      />
      <SelectWrapper>
        <FromLanguageSelect />
      </SelectWrapper>
    </Wrapper>
  );
};

export default TextInput;
