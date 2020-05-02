import React from 'react';
import { ContentBlock, Inline, Heading, TextLink } from '@fxtrot/edge';

import styles from './styles.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <ContentBlock>
        <Inline space="l" alignY="center">
          <Inline space="m" alignY="center">
            <img
              src="images/icon.svg"
              alt="Edge Translate logo"
              className={styles.logo}
              aria-hidden="true"
            />
            <Heading as="h3" tone="light">
              Edge Translate <span className={styles.delimiter}>|</span>
            </Heading>
          </Inline>
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
          </Inline>
        </Inline>
      </ContentBlock>
    </header>
  );
};

export default Header;
