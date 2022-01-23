import React from 'react';
import { Box, Column, Grid, Heading, styled, Text } from '@fxtrot/ui';
import ExtensionPopup from '../../../extension/src/popup/App';
import { ContentBlock } from '../components/ContentBlock';

import SafeHydrate from '../components/SafeHydrate';

const Main: React.FC = () => {
  return (
    <main>
      <Box py="5vh">
        <ContentBlock>
          <Column gap="16">
            <Column gap="2">
              <Heading level="2" as="h1">
                <Text align="center">Learn languages with Edge Translate</Text>
              </Heading>
              <Text>
                Edge Translate is a free, open-source, browser extension that
                helps you to translate unfamiliar words and phrases. While
                browsers are able to translate full page, extension allows you
                to keep reading the language you're learning, and only translate
                specific phrases you do not understand just yet.
              </Text>
            </Column>
            <Grid columns="1fr 1fr" gap="16" cross="start">
              <Column gap="6">
                <WebstoreLink href="https://chrome.google.com/webstore/detail/jbkaeigbknejjmhnkhmankagkfepncmn">
                  <img
                    src="/images/chrome-web-store.png"
                    alt="Available in Chrome Web Store"
                  />
                </WebstoreLink>
                <WebstoreLink href="https://microsoftedge.microsoft.com/addons/detail/fnpmkppmkmjgcdkjoblipakmfnocefog">
                  <img
                    src="/images/edge-addons.png"
                    alt="Available in Microsoft Edge Addons"
                  />
                </WebstoreLink>
              </Column>
              <Box boxShadow="$xs, $lg, $sm" br="$md" overflow="hidden">
                <SafeHydrate>
                  <ExtensionPopup />
                </SafeHydrate>
              </Box>
            </Grid>
          </Column>
        </ContentBlock>
      </Box>
    </main>
  );
};

export default Main;

const WebstoreLink = styled('a', {
  'height': 80,
  'br': '$md',
  'bc': '#fff',
  'textDecoration': 'none',
  'display': 'flex',
  'alignContent': 'center',
  'focusRing': '$focusRing',
  '& > img': { maxHeight: '100%' },
  '&:hover': {
    boxShadow: '0 0 0 3px $colors$focusRing',
  },
});
