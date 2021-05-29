import React from 'react';
import { Box, Flex, Heading } from '@fxtrot/ui';

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
        <Flex flow="column" gap="32" cross="center">
          {items.map((item) => (
            <Flex key={item.img} flow="column" gap="8" cross="center">
              <Heading level={2}>{item.title}</Heading>
              <Image src={item.img} alt={item.title} />
            </Flex>
          ))}
        </Flex>
      </ContentBlock>
    </Box>
  );
};

export default Features;
