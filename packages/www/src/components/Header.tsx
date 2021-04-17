import React from 'react';
import { Box, Flex, Heading, TextLink } from '@fxtrot/ui';
import Link from 'next/link';

import { ContentBlock } from './ContentBlock';

const Header = () => {
  return (
    <ContentBlock as="header" css={{ p: '$4' }}>
      <Flex gap="4" flow="row" cross="center" wrap="nowrap">
        <Link href="/">
          <TextLink>
            <Flex gap="md" cross="center" flow="row" wrap="nowrap">
              <Box
                as="img"
                css={{ size: 24 }}
                src="/images/icon.svg"
                alt="Edge Translate logo"
                aria-hidden="true"
              />
              <Heading level={3} variant="light">
                <Flex flow="row" cross="center" gap="4">
                  <span>Edge Translate</span>{' '}
                  <Box css={{ '@tablet': { display: 'none' } }}>|</Box>
                </Flex>
              </Heading>
            </Flex>
          </TextLink>
        </Link>
        <Flex flow="row" gap="4">
          <TextLink href="https://lexswed.github.io/">Author</TextLink>
          <TextLink href="https://github.com/LexSwed/edge-translate">
            Sources
          </TextLink>
          <Link href="/privacy" passHref>
            <TextLink>Privacy Policy</TextLink>
          </Link>
          <TextLink href="https://lexswed.typeform.com/to/fKJxgcPE">
            Leave Feedback
          </TextLink>
        </Flex>
      </Flex>
    </ContentBlock>
  );
};

export default Header;
