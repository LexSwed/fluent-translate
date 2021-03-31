import React from 'react';
import {
  Box,
  ContentBlock,
  Columns,
  Column,
  Heading,
  Stack,
} from '@fxtrot/edge';

import styles from './styles.module.css';
import Image from './image';

const Intro: React.FC = () => {
  return (
    <Box bg="gray.100" p="5vh 0">
      <ContentBlock>
        <Columns alignY="center" align="apart">
          <Column width="1/3">
            <Stack>
              <Heading as="h1">Translator Extension for your browser</Heading>
              <a
                href="https://chrome.google.com/webstore/detail/jbkaeigbknejjmhnkhmankagkfepncmn"
                className={styles.webStore}
              >
                <img
                  src="/images/chrome-web-store.png"
                  alt="Available in Chrome Web Store"
                />
              </a>
              <a
                href="https://microsoftedge.microsoft.com/addons/detail/fnpmkppmkmjgcdkjoblipakmfnocefog"
                className={styles.webStore}
              >
                <img
                  src="/images/edge-addons.png"
                  alt="Available in Microsoft Edge Addons"
                />
              </a>
            </Stack>
          </Column>
          <Column width="1/2">
            <div>
              <Image
                src="/images/screenshot-1.png"
                className={styles.screenshot}
              />
            </div>
          </Column>
        </Columns>
      </ContentBlock>
    </Box>
  );
};

export default Intro;