import React from 'react';
import { Text, Stack, Box } from '@fxtrot/edge';

import styles from './styles.css';

import LanguageSelect from '../LanguageSelect';
import TranslatorLink from '../TranslatorLink';
import { useToLanguage, useTranslation, useLanguages } from '../store/utils';

const TranslatedText: React.FC = () => {
  const [to, setTo] = useToLanguage();
  const { text, truncated } = useTranslation();
  const languages = useLanguages();

  return (
    <Stack space="s">
      <LanguageSelect value={to} onChange={setTo} languages={languages} />
      <Box pl="xs">
        <Text className={styles.translated}>
          {truncated ? (
            <>
              `${text}…`
              <TranslatorLink>Full translation</TranslatorLink>
            </>
          ) : (
            text
          )}
        </Text>
      </Box>
    </Stack>
  );
};

export default TranslatedText;
