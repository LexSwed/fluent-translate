import React from 'react';
import useSWR from 'swr';
import { Box, Flex, Heading, StyleRecord, Text } from '@fxtrot/ui';

import { useTranslation, useText } from '../store/utils';
import { API } from '../../utils';

const styles: StyleRecord = {
  wrapper: {
    overflow: 'auto',
  },
  heading: {
    fontSize: '$xs',
  },
  box: {
    display: 'grid',
    gridTemplateColumns: '34% 1fr',
    columnGap: '$3',
    rowGap: '$1',
  },
  dictionary: {
    lineHeight: 1.2,
  },
};

const Translations = () => {
  const { from, to, text } = useTranslation();
  const [sourceText] = useText();
  const { data } = useSWR(
    () => ([from, to, text].every(Boolean) ? [from, to, text] : null),
    (from, to) => API.dictionaryLookup({ text: sourceText, from, to })
  );

  if (!data) {
    return null;
  }

  return (
    <Box css={styles.wrapper}>
      <Flex space="sm" cross="stretch">
        {Object.entries(data.translations).map(([pos, translations]) => {
          return (
            <Flex key={pos} cross="stretch">
              <Heading as="h4" css={styles.heading}>
                {pos}
              </Heading>
              <Box css={styles.box}>
                {translations.map((el) => {
                  return (
                    <React.Fragment key={el.target}>
                      <Text size="xs" css={styles.dictionary}>
                        {el.target}
                      </Text>
                      <Text size="xs" tone="light" css={styles.dictionary}>
                        {el.backTranslations.join(', ')}
                      </Text>
                    </React.Fragment>
                  );
                })}
              </Box>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
};

export default Translations;
