import React from 'react';
import useSWR from 'swr';
import { Box, Heading, Text, Button, Inline } from '@fxtrot/edge';

import { useTranslation, useText, useStoreUpdater } from '../store/utils';
import { API } from '../../utils';

import styles from './styles.css';

const Translations = () => {
  const { from, to, text } = useTranslation();
  const [sourceText] = useText();
  const setSource = useStoreUpdater();

  const { data } = useSWR([from, to, text], (from, to) =>
    API.dictionaryLookup({ text: sourceText, from, to })
  );

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
                    <Box pb="m">
                      <Button
                        key={el.target}
                        tone="transparent"
                        size="xs"
                        onClick={() => {
                          setSource({ text: el.target, to: from, from: to });
                        }}
                        className={styles.dictItem}
                      >
                        {el.target}
                      </Button>
                    </Box>
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
