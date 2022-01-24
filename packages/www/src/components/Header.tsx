import React from 'react';
import { Box, Row, TextLink } from '@fxtrot/ui';
import Link from 'next/link';

import { ContentBlock } from './ContentBlock';

const Header = () => {
  return (
    <ContentBlock as="header" css={{ py: '$4' }}>
      <Row gap="4" main="space-between" cross="center" wrap="nowrap">
        <Link href="/" passHref>
          <TextLink>
            <Box
              as="img"
              css={{ size: 48 }}
              src="/images/icon.svg"
              alt="Edge Translate logo"
              aria-hidden="true"
            />
          </TextLink>
        </Link>
        <Row gap="4">
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
        </Row>
      </Row>
    </ContentBlock>
  );
};

export default Header;
