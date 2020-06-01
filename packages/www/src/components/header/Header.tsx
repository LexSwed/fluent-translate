import React from 'react';
import {
  Box,
  ContentBlock,
  Inline,
  Heading,
  TextLink,
  Hidden,
} from '@fxtrot/edge';
import Link from 'next/link';

import styles from './styles.module.css';

const Header = () => {
  return (
    <Box as="header" bg="#fff">
      <ContentBlock>
        <Inline space="l" nowrap>
          <Link href="/">
            <a href="/" className={styles.logoLink}>
              <Inline space="m" nowrap>
                <img
                  src="/images/icon.svg"
                  alt="Edge Translate logo"
                  className={styles.logo}
                  aria-hidden="true"
                />
                <Heading as="h3" variant="light">
                  Edge Translate{' '}
                  <Hidden as="span" below="tablet" className={styles.delimiter}>
                    |
                  </Hidden>
                </Heading>
              </Inline>
            </a>
          </Link>
          <Inline space="m">
            <TextLink href="https://lexswed.github.io/">Author</TextLink>
            <TextLink href="https://github.com/LexSwed/edge-translate">
              Sources
            </TextLink>
            <Link href="/privacy">
              <TextLink>Privacy Policy</TextLink>
            </Link>
            <TextLink href="https://alexanderswed.typeform.com/to/sjSxc6">
              Leave Feedback
            </TextLink>
          </Inline>
        </Inline>
      </ContentBlock>
    </Box>
  );
};

export default Header;
