import React from 'react';
import { Box, Column, Heading } from '@fxtrot/ui';

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
        <Column gap="32" cross="center">
          {items.map((item) => (
            <Column key={item.img} gap="8" cross="center">
              <Heading level={2}>{item.title}</Heading>
              <Image src={item.img} alt={item.title} />
            </Column>
          ))}
        </Column>
      </ContentBlock>
    </Box>
  );
};

export default Features;
