import React from 'react';
import { Text, Flex } from '@fxtrot/ui';

import { TranslatorLink } from '../TranslatorLink';
import { ToLanguageSelect } from '../LanguageSelect';
import { useTranslation } from '../atoms';

const Translated: React.FC = () => {
  const { translation } = useTranslation();

  if (!translation) {
    return null;
  }
  const { text, truncated } = translation;
  return (
    <Flex flow="column" gap="2" cross="stretch">
      <ToLanguageSelect />
      <Flex flow="column" gap="6" css={{ pl: '$2' }}>
        <Text size="md">
          {truncated ? (
            <>
              {`${text}… `}
              <TranslatorLink>Full translation</TranslatorLink>
            </>
          ) : (
            text
          )}
        </Text>
      </Flex>
    </Flex>
  );
};

export default React.memo(Translated);
