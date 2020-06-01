import React from 'react';
import { Text, Stack, Box } from '@fxtrot/edge';

import styles from './styles.css';

import { useToLanguage, useTranslation, useLanguages } from '../store/utils';
import LanguageSelect from '../LanguageSelect';
import TranslatorLink from '../TranslatorLink';
import Translations from '../Translations';

const Translated: React.FC = () => {
  const [to, setTo] = useToLanguage();
  const { text, truncated } = useTranslation();
  const languages = useLanguages();

  return (
    <Stack space="s">
      <LanguageSelect
        value={to}
        onChange={setTo}
        languages={languages}
        size="small"
      />
      <Box pl="xs">
        <Text className={styles.translated}>
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
    </Stack>
  );
};

export default React.memo(Translated);
