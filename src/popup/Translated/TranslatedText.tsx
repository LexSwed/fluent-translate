import React from 'react';
import { Text, Stack, Box } from '@fxtrot/edge';

import styles from './styles.css';

import { useToLanguage, useTranslation } from '../AppContext';
import LanguageSelect from '../LanguageSelect';
import TranslatorLink from '../TranslatorLink';

const TranslatedText: React.FC = () => {
  const [to, setTo] = useToLanguage();
  const { text, truncated } = useTranslation();

  return (
    <Stack space="s">
      <LanguageSelect value={to} onChange={setTo} />
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
