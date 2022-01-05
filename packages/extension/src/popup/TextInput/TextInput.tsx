import React from 'react';
import { Flex, TextArea } from '@fxtrot/ui';

import { FromLanguageSelect } from '../LanguageSelect';
import { useInputText } from '../atoms';

export const TextInput: React.FC = () => {
  const [text, setText] = useInputText();

  return (
    <Flex flow="column" gap="2">
      <Flex main="space-between" cross="baseline">
        <FromLanguageSelect />
      </Flex>
      <TextArea
        aria-label="Text to translate"
        value={text}
        onChange={setText}
        autoFocus
        size="md"
      />
    </Flex>
  );
};
