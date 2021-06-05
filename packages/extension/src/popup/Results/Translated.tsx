import React from 'react';
import { Text, Flex } from '@fxtrot/ui';

import { useTranslation } from '../store/utils';
import { TranslatorLink } from '../TranslatorLink';
import { ToLanguageSelect } from '../LanguageSelect';

const Translated: React.FC = () => {
  const { text, truncated } = useTranslation();

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
