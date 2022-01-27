import React from 'react';
import { Box, Flex, Row, TextLink } from '@fxtrot/ui';
import Link from 'next/link';

import { ContentBlock } from './ContentBlock';

const Header = () => {
  return (
    <ContentBlock as="header" css={{ py: '$4' }}>
      <Flex
        flow={{
          '@desktop': 'row',
          '@initial': 'column',
        }}
        gap="4"
        main="space-between"
        cross="center"
      >
        <Link href="/" passHref>
          <TextLink>
            <Box
              as="img"
              css={{ size: 48 }}
              src="/images/icon.svg"
              alt="Fluent Translate logo"
              aria-hidden="true"
            />
          </TextLink>
        </Link>
        <Row gap="4">
          <TextLink href="https://lexswed.github.io/">Author</TextLink>
          <TextLink href="https://github.com/LexSwed/fluent-translate">
            Sources
          </TextLink>
          <Link href="/privacy" passHref>
            <TextLink>Privacy Policy</TextLink>
          </Link>
          <TextLink href="https://lexswed.typeform.com/to/fKJxgcPE">
            Leave Feedback
          </TextLink>
        </Row>
      </Flex>
    </ContentBlock>
  );
};

export default Header;
