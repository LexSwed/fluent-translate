import React from 'react';
import useSWR from 'swr';
import { Box, Heading, Text } from '@fxtrot/edge';

import { useTranslation, useText } from '../store/utils';
import { API } from '../../utils';

import styles from './styles.css';

const Translations = () => {
  const { from, to, text } = useTranslation();
  const [sourceText] = useText();
  const { data } = useSWR(
    () => ([from, to, text].every(Boolean) ? [from, to, text] : null),
    (from, to) => API.dictionaryLookup({ text: sourceText, from, to })
  );
  console.log(data);
  if (!data) {
    return null;
  }

  return (
    <>
      {Object.entries(data.translations).map(([pos, translations]) => {
        return (
          <Box mt="xs" key={pos}>
            <Heading as="h4" className={styles.pos}>
              {pos}
            </Heading>
            <Text className={styles.grid}>
              {translations.map((el) => {
                return (
                  <>
                    <Text key={el.target}>{el.target}</Text>
                    <Text tone="light">{el.backTranslations.join(', ')}</Text>
                  </>
                );
              })}
            </Text>
          </Box>
        );
      })}
    </>
  );
};

export default Translations;
