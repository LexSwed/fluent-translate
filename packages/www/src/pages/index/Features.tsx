import React from 'react';

import styles from './styles.module.css';
import { ContentBlock, Stack, Heading, Inline } from '@fxtrot/edge';

const items = [
  {
    title: 'Simple popup for quick text translate',
    img: '/images/screenshot-2.png'
  },
  {
    title: 'Day or night, it follows your style',
    img: '/images/screenshot-1.png'
  },
  {
    title: 'Translate faster with Right Click',
    img: '/images/screenshot-3.png'
  }
];

const Features = () => {
  return (
    <div className={styles.features}>
      <ContentBlock wide>
        <Inline space="xl" align="center" alignY="center">
          {items.map((item) => (
            <Stack key={item.img} align="center">
              <img src={item.img} alt="" className={styles.featureImg} />
              <Heading as="h3">{item.title}</Heading>
            </Stack>
          ))}
        </Inline>
      </ContentBlock>
    </div>
  );
};

export default Features;