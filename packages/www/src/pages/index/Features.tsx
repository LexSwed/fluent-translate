import React from 'react';
import { ContentBlock, Stack, Heading, Inline } from '@fxtrot/edge';

import styles from './styles.module.css';

import Image from '../../components/image';

const items = [
  {
    title: 'Simple popup for quick text translate',
    img: '/images/screenshot-2.webp'
  },
  {
    title: 'Day or night, it follows your style',
    img: '/images/screenshot-1.webp'
  },
  {
    title: 'Translate faster with Right Click',
    img: '/images/screenshot-3.webp'
  }
];

const Features = () => {
  return (
    <div className={styles.features}>
      <ContentBlock wide>
        <Inline space="xl" align="center" alignY="center">
          {items.map((item) => (
            <Stack key={item.img} align="center">
              <Image src={item.img} className={styles.featureImg} />
              <Heading as="h3">{item.title}</Heading>
            </Stack>
          ))}
        </Inline>
      </ContentBlock>
    </div>
  );
};

export default Features;
