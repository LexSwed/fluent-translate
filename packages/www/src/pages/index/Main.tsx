import React from 'react';
import { Box } from '@fxtrot/edge';

import Intro from './Intro';
import Features from './Features';

const Main: React.FC = () => {
  return (
    <Box as="main">
      <Intro />
      <Features />
    </Box>
  );
};

export default Main;
