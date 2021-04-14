import React from 'react';
import { Box, Flex, Heading, css } from '@fxtrot/ui';

import Image from './Image';
import { ContentBlock } from './ContentBlock';

const items = [
  {
    title: 'Simple popup for quick text translate',
    img: '/images/screenshot-2.webp',
  },
  {
    title: 'Day or night, it follows your style',
    img: '/images/screenshot-1.webp',
  },
  {
    title: 'Translate faster with Right Click',
    img: '/images/screenshot-3.webp',
  },
];

const Features = () => {
  return (
    <Box py="5vh">
      <ContentBlock css={{ maxWidth: 1280 }}>
        <Flex gap="32" cross="center">
          {items.map((item) => (
            <Flex key={item.img} gap="8" cross="center">
              <Heading level={2}>{item.title}</Heading>
              <Image className={styles.image} src={item.img} alt={item.title} />
            </Flex>
          ))}
        </Flex>
      </ContentBlock>
    </Box>
  );
};

export default Features;

const styles = {
  image: css({
    '@initial': {
      maxWidth: 600,
    },
    '@tablet': {
      maxWidth: '80vw',
    },
    '@mobile': {
      maxWidth: '90vw',
    },
  })(),
} as const;
