import React from 'react';
import { stitchesConfig, styled, Text } from '@fxtrot/ui';

export const Skeleton = () => {
  return (
    <Text textStyle="body-md" aria-busy={true}>
      <SkeletonShimmer aria-hidden={true} />
    </Text>
  );
};

const skeletonKeyframe = stitchesConfig.keyframes({
  '0%': {
    transform: 'skewX(-10deg) translateX(-100%)',
  },
  '100%': {
    transform: 'skewX(-10deg) translateX(200%)',
  },
});

const SkeletonShimmer = styled('div', {
  'position': 'relative',
  'height': '$lineHeights$md',
  'width': '60%',
  'bc': '$surface1',
  'br': '$sm',
  'overflow': 'hidden',
  '&:before': {
    content: '',
    position: 'absolute',
    background:
      'linear-gradient(90deg, transparent, $colors$surface2, transparent)',
    width: '50%',
    height: '100%',
    top: 0,
    left: 0,
    animation: `${skeletonKeyframe} 0.9s infinite`,
  },
});
