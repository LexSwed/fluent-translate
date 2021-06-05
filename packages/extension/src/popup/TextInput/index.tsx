import React, { useRef, useLayoutEffect } from 'react';
import autosize from 'autosize';
import { styled, Box, Flex } from '@fxtrot/ui';

import { useText } from '../store/utils';
import { FromLanguageSelect } from '../LanguageSelect';

export const TextInput: React.FC = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
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
      multiline={multiline}
      main="stretch"
      cross={multiline ? 'stretch' : 'center'}
    >
      <TextArea
        value={text}
        onChange={(e: any) => {
          setText(e.target.value);
        }}
        autoFocus
        ref={inputRef}
      />
      <SelectWrapper>
        <FromLanguageSelect />
      </SelectWrapper>
    </Wrapper>
  );
};

const TextArea = styled('textarea', {
  display: 'block',
  outline: 'none',
  border: 'none',
  resize: 'none',
  fontFamily: 'inherit',
  minHeight: '1rem',
  height: '1rem',
  maxHeight: '150px',
  width: 'calc(100% - 8px * 2)',
  boxSizing: 'content-box',
  overflow: 'hidden',
  fontSize: '$md',
  p: '$2',
  br: '$md',
  bc: 'transparent',
  color: '$text',
});

const SelectWrapper = styled(Box, {
  pr: '$1',
});

const Wrapper = styled(Flex, {
  'border': '1px solid $borderStill',
  'br': '$md',
  'transition': '0.12s ease-in-out',

  ':hover': { borderColor: '$borderHover' },

  '&:focus-within': {
    borderColor: '$borderActive',
  },

  'variants': {
    multiline: {
      true: {
        [`& > ${SelectWrapper}`]: {
          alignSelf: 'flex-end',
          pb: '$1',
        },
      },
    },
  },
});
