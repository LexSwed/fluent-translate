import React from 'react';
import { Box, Flex, Grid, Heading, styled } from '@fxtrot/ui';

import Image from './Image';
import { ContentBlock } from './ContentBlock';

const Intro: React.FC = () => {
  return (
    <Box py="5vh">
      <ContentBlock>
        <Heading>Translator Extension for your browser</Heading>
        <Grid columns="1fr 1fr" gap="16">
          <Flex gap="6">
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
          </Flex>
          <Image src="/images/screenshot-1.png" />
        </Grid>
      </ContentBlock>
    </Box>
  );
};

export default Intro;

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
