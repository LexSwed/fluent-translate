import React from 'react';
import { Text, Flex, Box, StyleRecord } from '@fxtrot/ui';

import { useToLanguage, useTranslation, useLanguages } from '../store/utils';
import LanguageSelect from '../LanguageSelect';
import TranslatorLink from '../TranslatorLink';
import Translations from '../Translations';

const styles: StyleRecord = {
  box: {
    pl: '$1',
  },
  text: {
    whiteSpace: 'pre-wrap',
    fontSize: '$sm',
    fontWeight: 500,
  },
};

const Translated: React.FC = () => {
  const [to, setTo] = useToLanguage();
  const { text, truncated } = useTranslation();
  const languages = useLanguages();

  return (
    <Flex space="sm" cross="stretch">
      <LanguageSelect
        value={to}
        onChange={setTo}
        languages={languages}
        size="small"
      />
      <Box css={styles.box}>
        <Text css={styles.text}>
          {truncated ? (
            <>
              {`${text}… `}
              <TranslatorLink>Full translation</TranslatorLink>
            </>
          ) : (
            text
          )}
        </Text>
      </Box>
      <Translations />
    </Flex>
  );
};

export default React.memo(Translated);
