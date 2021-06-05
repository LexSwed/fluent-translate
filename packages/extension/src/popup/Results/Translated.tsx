import React from 'react';
import { Text, Flex } from '@fxtrot/ui';

import { useToLanguage, useTranslation, useLanguages } from '../store/utils';
import { LanguageSelect } from '../LanguageSelect';
import { TranslatorLink } from '../TranslatorLink';

const Translated: React.FC = () => {
  const [to, setTo] = useToLanguage();
  const { text, truncated } = useTranslation();
  const languages = useLanguages();

  return (
    <Flex flow="column" gap="4" cross="stretch">
      <LanguageSelect value={to} onChange={setTo} languages={languages} />
      <Flex flow="column" gap="6" css={{ pl: '$2' }}>
        <Text size="lg">
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
