import React, { Suspense } from 'react';
import { Box, Column, Grid, Heading, styled, Text } from '@fxtrot/ui';
import { ContentBlock } from '../components/ContentBlock';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const ExtensionPopup = dynamic(
  () => import('@fluent-translate/extension/src/popup/App'),
  { ssr: false, suspense: true }
);

const Main: React.FC = () => {
  return (
    <main>
      <Box py="5vh">
        <ContentBlock>
          <Column gap="16">
            <Column gap="2">
              <Heading level="2" as="h1">
                <Text align="center">
                  Learn languages with Fluent Translate
                </Text>
              </Heading>
              <Text>
                Fluent Translate is a free, open-source, browser extension that
                helps you to translate unfamiliar words and phrases. While
                browsers are able to translate full page, extension allows you
                to keep reading the language you're learning, and only translate
                specific phrases you do not understand just yet.
              </Text>
            </Column>
            <Grid
              css={{
                '@desktop': {
                  gridTemplateColumns: 'repeat(2, 1fr)',
                },
                '@tablet': {
                  gridTemplateColumns: '1fr',
                },
              }}
              gap="16"
              cross="start"
            >
              <Column gap="6">
                <WebstoreLink href="https://chrome.google.com/webstore/detail/jbkaeigbknejjmhnkhmankagkfepncmn">
                  <Image
                    src="/images/chrome-web-store.png"
                    alt="Available in Chrome Web Store"
                    height={80}
                    width={264}
                  />
                </WebstoreLink>
                <WebstoreLink href="https://microsoftedge.microsoft.com/addons/detail/fnpmkppmkmjgcdkjoblipakmfnocefog">
                  <Image
                    src="/images/edge-addons.png"
                    alt="Available in Microsoft Edge Addons"
                    height={80}
                    width={264}
                  />
                </WebstoreLink>
              </Column>
              <Suspense fallback={null}>
                <Box boxShadow="$xs, $lg, $sm" br="$md" overflow="hidden">
                  <ExtensionPopup />
                </Box>
              </Suspense>
            </Grid>
          </Column>
        </ContentBlock>
      </Box>
    </main>
  );
};

export default Main;

const WebstoreLink = styled('a', {
  'position': 'relative',
  'br': '$md',
  'bc': '#fff',
  'border': '1px solid transparent',
  'textDecoration': 'none',
  'display': 'flex',
  'alignContent': 'center',
  'focusRing': '$focusRing',
  'transition': '0.24s',
  '@light': {
    'borderColor': '$outline',
    '&:hover': {
      borderColor: '$surface5',
      boxShadow: '0 0 0 1px $colors$outline inset',
    },
  },
  '& > img': { maxHeight: '100%' },
  '&:hover': {
    filter: 'brightness(0.95)',
  },
});
