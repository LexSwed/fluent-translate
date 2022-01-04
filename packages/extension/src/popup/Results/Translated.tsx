import { memo } from 'react';
import { Text, Flex } from '@fxtrot/ui';

import { TranslatorLink } from '../TranslatorLink';
import { ToLanguageSelect } from '../LanguageSelect';
import { useTranslation } from '../atoms';

export const Translated = memo(() => {
  const { translation } = useTranslation();

  if (!translation) {
    return null;
  }
  const { text } = translation;
  return (
    <Flex flow="column" gap="2" cross="stretch">
      <ToLanguageSelect />
      <Flex flow="column" gap="6" css={{ pl: '$2' }}>
        <Text size="md">{text}</Text>
        <TranslatorLink>See more on Google Translate</TranslatorLink>
      </Flex>
    </Flex>
  );
});
