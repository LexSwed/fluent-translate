import { styled } from '@stitches/react';
import React from 'react';

const Picture = styled('picture', {
  '& > img': {
    'maxWidth': 600,
    '@tablet': {
      maxWidth: '80vw',
    },
    '@mobile': {
      maxWidth: '90vw',
    },
  },
});

interface Props extends React.ComponentProps<'img'> {}

const Image: React.FC<Props> = ({ src, ...props }) => {
  const path = src?.slice(0, src.lastIndexOf('.'));

  return (
    <Picture>
      <source type="image/webp" srcSet={`${path}.webp`} />
      <source type="image/png" srcSet={`${path}.png`} />
      <source type="image/jpg" srcSet={`${path}.jpg`} />
      <img src={`${path}.png`} alt="" {...props} />
    </Picture>
  );
};

export default Image;
