import React from 'react';
import { Box, ContentBlock, Stack, Heading } from '@fxtrot/edge';

import Image from '../../components/image';

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
    <Box p="5vh 0">
      <ContentBlock wide>
        <Stack space="xl" align="center">
          {items.map((item) => (
            <Stack key={item.img} align="center">
              <Heading as="h3">{item.title}</Heading>
              <Box
                as={Image}
                width={['100vw', '90vw', 600, 600]}
                src={item.img}
              />
            </Stack>
          ))}
        </Stack>
      </ContentBlock>
    </Box>
  );
};

export default Features;
