import React from 'react';
import { ContentBlock, Inline, Heading, TextLink } from '@fxtrot/edge';
import cx from 'classnames';
import Link from 'next/link';

import styles from './styles.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <ContentBlock>
        <Inline space="l" alignY="center">
          <Link href="/">
            <a href="/" className={styles.logoLink}>
              <Inline space="m" alignY="center">
                <img
                  src="/images/icon.svg"
                  alt="Edge Translate logo"
                  className={styles.logo}
                  aria-hidden="true"
                />
                <Heading as="h3" tone="light">
                  Edge Translate <span className={styles.delimiter}>|</span>
                </Heading>
              </Inline>
            </a>
          </Link>
          <Inline space="m" alignY="center">
            <TextLink href="https://lexswed.github.io/" className={styles.link}>
              Author
            </TextLink>
            <TextLink
              href="https://github.com/LexSwed/edge-translate"
              className={styles.link}
            >
              Sources
            </TextLink>
            <Link href="/privacy">
              <TextLink className={styles.link}>Privacy Policy</TextLink>
            </Link>
            <TextLink
              href="https://alexanderswed.typeform.com/to/sjSxc6"
              className={cx(styles.link, styles.highlight)}
            >
              Leave Feedback
            </TextLink>
          </Inline>
        </Inline>
      </ContentBlock>
    </header>
  );
};

export default Header;
