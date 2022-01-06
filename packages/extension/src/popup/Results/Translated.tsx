import { memo } from 'react';
import { Text, Flex, Box } from '@fxtrot/ui';

import { ToLanguageSelect } from '../LanguageSelect';
import { useTranslation } from '../atoms';

export const Translated = memo(() => {
  const { translation } = useTranslation();

  if (!translation) {
    return null;
  }
  console.log(translation);
  const { text, pronunciation } = translation;
  return (
    <Box p="$3">
      <Flex flow="column" gap="2" cross="stretch">
        <ToLanguageSelect />
        <Flex flow="column" gap="1" css={{ pl: '$1' }}>
          {text && <Text size="md">{text}</Text>}
          {pronunciation && (
            <Text size="sm" css={{ color: '$textSubtle' }}>
              {pronunciation}
            </Text>
          )}
        </Flex>
      </Flex>
    </Box>
  );
});
