import React from 'react';
import { Box } from '@fxtrot/edge';

import Intro from '../components/Intro';
import Features from '../components/Features';

const Main: React.FC = () => {
  return (
    <Box as="main">
      <Intro />
      <Features />
    </Box>
  );
};

export default Main;
