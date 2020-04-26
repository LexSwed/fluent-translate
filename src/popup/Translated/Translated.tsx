import React from 'react';
import { Box, Text, Icon } from '@fxtrot/edge';

import styles from './styles.css';

import { useTranslation, useToLanguage } from '../AppContext';
import LanguageSelect from '../LanguageSelect';
import TranslatorLink from '../TranslatorLink';

const Translated = () => {
  const [to, setTo] = useToLanguage();
  const translation = useTranslation();

  return (
    <Box className={styles.wrapper}>
      {translation.text ? (
        <>
          <LanguageSelect value={to} onChange={setTo} />
          <Text className={styles.translated}>
            {translation.truncated ? (
              <>
                `${translation.text}…`
                <TranslatorLink>Full translation</TranslatorLink>
              </>
            ) : (
              translation.text
            )}
          </Text>
        </>
      ) : (
        <Box className={styles.empty}>
          <Icon icon="language" size="xl" />
        </Box>
      )}
    </Box>
  );
};

export default Translated;
